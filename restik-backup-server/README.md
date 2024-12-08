Restic Backup Add-on for Home Assistant
=======================================

Overview
--------

The Restic Backup Add-on allows you to back up your Home Assistant data using [Restic](https://restic.net/) and [SSHFS](https://github.com/libfuse/sshfs). It provides a user-friendly web interface built with Next.js and React, enabling you to configure local and remote backup locations, schedule backups, and monitor backup statuses.

Features
--------

*   **Backup Locations Configuration**: Configure local directories or remote locations over SSH for backups.
*   **Backup Scheduling**: Set up cron schedules for automatic backups.
*   **Status Tracking**: View the status of your backups, including last successful backup, last attempt, and backup size.
*   **UI Integration**: Access the add-on's web interface directly from the Home Assistant sidebar.

Installation
------------

1.  **Add the Add-on Repository**:
    
    In Home Assistant, navigate to **Supervisor** > **Add-on Store**, click on the three dots in the top right corner, select **Repositories**, and add this repository's URL:
    ````
    https://github.com/sahilanguralla/hassio-addons
    ````
    
3.  **Install the Add-on**:
    
    Find the "Restic Backup Add-on" in the add-on store and click **Install**.
    
4.  **Configure the Add-on**:
    
    After installation, go to the add-on's **Configuration** tab and set the required options (see Configuration section below).
    
5.  **Start the Add-on**:
    
    Click **Start** to run the add-on.
    
6.  **Access the Web Interface**:
    
    Enable **Show in Sidebar** to access the add-on's UI directly from the Home Assistant sidebar. Click on **Restic Backup** in the sidebar to open the UI.
    

Configuration
-------------

The add-on accepts the following configuration options:

*   **db\_host** (string): The hostname of the PostgreSQL database.
*   **db\_port** (integer): The port number of the PostgreSQL database.
*   **db\_name** (string): The name of the PostgreSQL database.
*   **db\_user** (string): The username for the PostgreSQL database.
*   **db\_password** (string): The password for the PostgreSQL database user.
*   **ui\_port** (port number): The port on which the add-on's web interface will be accessible (default is 3000).

**Example Configuration**:

yaml

Copy code

`db_host: "postgres" db_port: 5432 db_name: "restic_db" db_user: "restic_user" db_password: "restic_pass" ui_port: 3000`

**Note**: Ensure that the PostgreSQL database is accessible and the credentials are correct.

Usage
-----

1.  **Open the UI**:
    
    Click on **Restic Backup** in the Home Assistant sidebar.
    
2.  **Add a Backup Location**:
    
    *   Click on **Add Location**.
    *   Choose the type of location (**Local** or **Remote**).
    *   For **Local**:
        *   Enter the path to the directory you wish to back up.
    *   For **Remote**:
        *   Enter the SSH host, username, and either a password or SSH key.
        *   Specify the remote path to back up.
    *   Set the cron schedule for backups.
    *   Provide a name for the Restic repository.
3.  **Monitor Backups**:
    
    *   View the list of configured backup locations.
    *   Check the status, last backup time, and backup size.
4.  **Edit or Delete Locations**:
    
    *   Use the **Edit** or **Delete** buttons next to each location to modify or remove backup configurations.

Support
-------

If you encounter any issues or have questions, please refer to the repository's issue tracker.
