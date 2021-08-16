import logging
import csv
import os
import json
from swiftclient.service import SwiftService, SwiftError
from dotenv import load_dotenv

load_dotenv(override=True)


def get_files():
    with open("upload.csv", mode="r") as file:
        myDict = [
            {k: v for k, v in row.items()}
            for row in csv.DictReader(file, skipinitialspace=True)
        ]
        return myDict


def load_data():

    json_file = open("data.json", "r")
    json_dict = json.load(json_file)
    json_file.close()

    return json_dict


logging.basicConfig(level=logging.ERROR)
logging.getLogger("requests").setLevel(logging.CRITICAL)
logging.getLogger("swiftclient").setLevel(logging.CRITICAL)
logger = logging.getLogger(__name__)

container = os.getenv("CONTAINER_NAME")
filesToUpload = load_data()

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
        for file in filesToUpload["tools"]:
            print(f"Uploading {file['path_to_image']}....")
            for res in swift.upload(
                container,
                [file["path_to_image"]],
                {
                    "meta": [
                        f"name:{file['name']}",
                        f"short_desc: {file['short_desc']}",
                        f"desc: {file['desc']}",
                        f"website: {file['website']}",
                        f"version: {file['version']}",
                        f"portal_image_params: {file['portal_image_params']}",
                        f"rest_api_command: {file['rest_api_command']}",
                        f"tool_name: {file['tool_name']}",
                        f"output: {file['output']}",
                        f"data:{json.dumps(file['data'])}",
                    ]
                },
            ):
                if not res["success"]:
                    errors.append(res["error"])
    except SwiftError as e:
        print(e.value)
        logger.error(e.value)

    print(errors)
