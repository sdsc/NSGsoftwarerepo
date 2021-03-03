import logging
import csv
from swiftclient.service import SwiftService, SwiftError


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

container = "share_demo"
filesToUpload = get_files()
errors = []
with SwiftService() as swift:

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
