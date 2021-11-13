import os
from dotenv import load_dotenv
import pymysql.cursors
from itertools import groupby

load_dotenv(override=True)

cloud_url_prefix = "https://object.cloud.sdsc.edu:443/v1/"


def key_func(k):
    return k["tool_id"]


def get_tools_from_db():
    connection = pymysql.connect(
        host=os.getenv("MYSQL_HOST"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PASSWORD"),
        database=os.getenv("MYSQL_DB"),
        cursorclass=pymysql.cursors.DictCursor,
    )
    tools = []
    commands = []
    with connection.cursor() as cursor:
        sql_tools = """
        SELECT
            tools.id,
            tools.name,
            tools.`desc`,
            tools.short_desc as 'shortDesc',
            tools.website,
            tools.download_link as 'downloadLink',
            tools.`version`,
            tools.image_name as 'imageName',
            tools.tool_name as 'toolName',
            tools.link_name as 'linkName'
        FROM tools
        """
        cursor.execute(sql_tools)
        tools = cursor.fetchall()

        sql_commands = """
        SELECT
            commands.tool_id,
            commands.api AS 'api',
            commands.portal AS 'portal',
            commands.singularity AS 'singularity',
            commands.name AS 'commandName',
            inputs. `name` AS 'inputName',
            inputs. `source` AS 'inputSource',
            outputs. `output` AS 'output'
        FROM
            commands
            LEFT OUTER JOIN inputs ON commands.input_id = inputs.id
            LEFT OUTER JOIN outputs ON commands.output_id = outputs.id
        """
        cursor.execute(sql_commands)
        commands = cursor.fetchall()
    for tool in tools:
        for key, value in groupby(commands, key_func):
            if tool["id"] == key:
                tool["commands"] = list(value)
        if "commands" not in tool:
            tool["commands"] = [
                {
                    "api": "Placeholder",
                    "inputName": "Placeholder",
                    "inputSource": "Placeholder",
                    "output": "Placeholder",
                    "portal": "Placeholder",
                    "singularity": "Placeholder",
                }
            ]
    return {"tools": tools}
