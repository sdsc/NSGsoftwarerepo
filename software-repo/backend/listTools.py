import logging
from swiftclient.service import SwiftService, SwiftError
import os
from dotenv import load_dotenv

load_dotenv()

cloud_url_refix = "https://object.cloud.sdsc.edu:443/v1/"


def get_tool_list():
    logging.basicConfig(level=logging.ERROR)
    logging.getLogger("requests").setLevel(logging.CRITICAL)
    logging.getLogger("swiftclient").setLevel(logging.CRITICAL)
    logger = logging.getLogger(__name__)

    opestack_cred = {
        "auth_version": os.getenv("ST_AUTH_VERSION"),  # Should be '3'
        "os_username": os.getenv("OS_USERNAME"),
        "os_password": os.getenv("OS_PASSWORD"),
        "os_project_name": os.getenv("OS_PROJECT_NAME"),
        "os_project_domain_name": os.getenv("OS_PROJECT_DOMAIN_NAME"),
        "os_auth_url": os.getenv("OS_AUTH_URL"),
    }

    container = "share_demo"
    objects = []
    header_data = {}
    formatted_objects = []
    with SwiftService(options=opestack_cred) as swift:
        try:
            list_parts_gen = swift.list(container=container)
            for page in list_parts_gen:
                if page["success"]:
                    for item in page["listing"]:
                        i_name = item["name"]
                        objects.append(i_name)
                else:
                    raise page["error"]
            stats_it = swift.stat(container=container, objects=objects)
            for stat_res in stats_it:
                if stat_res["success"]:
                    formatted_object = {}
                    header_data[stat_res["object"]] = stat_res["headers"]
                    formatted_object["title"] = stat_res["headers"][
                        "x-object-meta-title"
                    ]
                    formatted_object["description"] = stat_res["headers"][
                        "x-object-meta-description"
                    ]
                    formatted_object["git_url"] = stat_res["headers"][
                        "x-object-meta-url"
                    ]
                    formatted_object["version"] = stat_res["headers"][
                        "x-object-meta-version"
                    ]
                    formatted_object["id"] = stat_res["headers"]["etag"]
                    formatted_object["content-type"] = stat_res["headers"][
                        "content-type"
                    ]
                    account = stat_res["items"][0][1]
                    container = stat_res["container"]
                    file = stat_res["object"]
                    formatted_object[
                        "download_link"
                    ] = f"{cloud_url_refix}{account}/{container}/{file}"
                    formatted_objects.append(formatted_object)
                else:
                    logger.error("Failed to retrieve stats for %s" % stat_res["object"])

        except SwiftError as e:
            print(e.value)
            logger.error(e.value)
    return {"tools": formatted_objects}
