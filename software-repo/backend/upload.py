import logging
import csv
import os
from swiftclient.service import SwiftService, SwiftError
from dotenv import load_dotenv

load_dotenv()


def get_files():
    with open("upload.csv", mode="r") as file:
        myDict = [
            {k: v for k, v in row.items()}
            for row in csv.DictReader(file, skipinitialspace=True)
        ]
        return myDict


logging.basicConfig(level=logging.ERROR)
logging.getLogger("requests").setLevel(logging.CRITICAL)
logging.getLogger("swiftclient").setLevel(logging.CRITICAL)
logger = logging.getLogger(__name__)

container = os.getenv("CONTAINER_NAME")
filesToUpload = get_files()

opestack_cred = {
    "auth_version": os.getenv("ST_AUTH_VERSION"),  # Should be '3'
    "os_username": os.getenv("OS_USERNAME"),
    "os_password": os.getenv("OS_PASSWORD"),
    "os_project_name": os.getenv("OS_PROJECT_NAME"),
    "os_project_domain_name": os.getenv("OS_PROJECT_DOMAIN_NAME"),
    "os_auth_url": os.getenv("OS_AUTH_URL"),
    "os_tenant_name": os.getenv("OS_USERNAME"),
    "os_project_domain_id": os.getenv("OS_PROJECT_DOMAIN_ID"),
}

errors = []
with SwiftService(options=opestack_cred) as swift:

    try:
        for file in filesToUpload:
            for res in swift.upload(
                container,
                [file["file"]],
                {
                    "meta": [
                        f"title:{file['title']}",
                        f"description:{file['description']}",
                        f"url:{file['url']}",
                        f"version:{file['version']}",
                    ]
                },
            ):
                if not res["success"]:
                    errors.append(res["error"])
    except SwiftError as e:
        print(e.value)
        logger.error(e.value)

    print(errors)
