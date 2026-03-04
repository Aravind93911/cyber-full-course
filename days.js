/**
 * DAYS_DATA for the Full Cybersecurity Lab Course.
 *
 * This array defines the entire course roadmap, including daily tasks,
 * learning resources, code snippets, and output validation requirements.
 *
 * Structure:
 * [
 *   {
 *     day: Number,          // Unique day number (1-180 for 6 months)
 *     title: String,        // Descriptive title for the day
 *     topic: String,        // Short topic summary
 *     overview: String,     // Longer description of the day's goals
 *     reading: Array<String | {text: String, href: String}>, // List of reading materials/links
 *     vm_tasks: Array<String>, // Hands-on tasks to perform in the VM
 *     code_snippet: String, // Example commands or code
 *     points: Number,       // Points awarded for completing the day
 *     check: {              // (Optional) Object defining the output validation
 *       prompt: String,     // Message shown to the user for submission
 *       hint: String,       // (Optional) Hint displayed if validation fails
 *       validation: {
 *         type: String,     // "equals", "oneOf", "includesAll", "regex", "sha256"
 *         // Properties vary by type:
 *         // - value: String (for "equals")
 *         // - values: Array<String> (for "oneOf", "includesAll")
 *         // - pattern: String, flags: String (for "regex")
 *         // - hash: String (for "sha256")
 *         // - normalize: String (Optional, "trimLowerCollapse" default)
 *       }
 *     }
 *   },
 *   // ... more days
 * ]
 */

const DAYS_DATA = [
  // --- Month 1: Linux & Networking Fundamentals ---

  {
    day: 1,
    title: "Day 1: Linux Shell & Filesystem Navigation",
    topic: "pwd, ls, cd, mkdir, touch - Your first steps in the terminal.",
    overview: "Get comfortable with the Linux command line. Learn to navigate the filesystem, create directories and files, and list their contents. This is foundational for all cybersecurity tasks.",
    reading: [
      "LinuxCheatSheet.pdf (Pages 2-3: Basic Shell & File Operations)",
      { text: "Linux Command Line Basics (external)", href: "https://ryanstutorials.net/linuxtutorial/commandline.php" }
    ],
    vm_tasks: [
      "Open your Kali/Parrot VM terminal.",
      "Use `pwd` to see your current location.",
      "List contents with `ls`, `ls -l`, `ls -la`.",
      "Create a new directory named `cyber_lab` in your home folder.",
      "Navigate into `cyber_lab` and create a file named `my_first_file.txt`.",
      "Verify the file and directory creation."
    ],
    code_snippet: `pwd
ls -la
mkdir ~/cyber_lab
cd ~/cyber_lab
touch my_first_file.txt
ls -la`,
    points: 100,
    check: {
      prompt: "Paste the output of `pwd` when you are inside your `cyber_lab` directory. It must start with `/home/` or `~/`.",
      hint: "Make sure you `cd` into the `cyber_lab` directory before running `pwd`. The path should reflect your home directory and the new folder.",
      validation: {
        type: "regex",
        pattern: "^/(home|root)/[^/]+/cyber_lab/?$", // Example: /home/kali/cyber_lab or /root/cyber_lab
        flags: "m",
        testNormalized: false
      }
    }
  },

  {
    day: 2,
    title: "Day 2: Linux File & Directory Operations (Advanced)",
    topic: "cp, mv, rm - Copying, moving, and deleting files and folders.",
    overview: "Master essential file management commands. Understand how to copy, move, and safely remove files and directories, including recursive and force options.",
    reading: [
      "LinuxCheatSheet.pdf (Page 3: File and Directory Operations)",
      { text: "Linux File Management Commands", href: "https://www.geeksforgeeks.org/linux-file-management/" }
    ],
    vm_tasks: [
      "Inside `~/cyber_lab`, create a sub-directory named `backup`.",
      "Copy `my_first_file.txt` into the `backup` directory.",
      "Rename `my_first_file.txt` to `original.txt`.",
      "Move `backup/my_first_file.txt` back to `cyber_lab` (now it's `cyber_lab/my_first_file.txt`).",
      "Delete the `backup` directory (make sure it's empty first or use `-r`).",
      "Verify all operations."
    ],
    code_snippet: `cd ~/cyber_lab
mkdir backup
cp my_first_file.txt backup/
mv my_first_file.txt original.txt
mv backup/my_first_file.txt .
rmdir backup # Or rm -r backup/ if it still had files
ls -l`,
    points: 100,
    check: {
      prompt: "After completing all tasks, paste the output of `ls -l ~/cyber_lab`. It should show `original.txt` and `my_first_file.txt`, but NO `backup` directory.",
      hint: "Ensure both files are present and no 'backup' directory. You might need `rm -r backup` if it was not empty. Check for exact filenames.",
      validation: {
        type: "includesAll",
        values: ["original.txt", "my_first_file.txt", "total", "drwx"], // Check for typical ls -l output parts
        normalize: "trimLowerCollapse"
      }
    }
  },

  {
    day: 3,
    title: "Day 3: Linux File Permissions (chmod, chown, umask)",
    topic: "Understanding and setting file/directory access.",
    overview: "Dive deep into Linux file permissions. Learn about user, group, and others, and read, write, execute permissions. Use `chmod` and `chown` to control who can do what with your files.",
    reading: [
      "LinuxCheatSheet.pdf (Pages 6-9: File Permissions & Commands)",
      { text: "Linux File Permissions Explained", href: "https://www.linuxfoundation.org/blog/blog/classic-sysadmin-understanding-linux-file-permissions" }
    ],
    vm_tasks: [
      "In `~/cyber_lab`, create a file named `secret.txt`.",
      "Set `secret.txt` permissions to `r--r--r--` (read-only for everyone).",
      "Try to write to `secret.txt` as your current user (should fail).",
      "Set `secret.txt` permissions to `rwx------` (read/write/execute for owner only).",
      "Change the owner of `secret.txt` to `root` (you'll need `sudo`).",
      "Check `umask` value. Create a new file to see default permissions."
    ],
    code_snippet: `cd ~/cyber_lab
touch secret.txt
chmod 444 secret.txt
echo "test" >> secret.txt # This should fail
chmod 700 secret.txt
echo "test" >> secret.txt # This should work
sudo chown root secret.txt
ls -l secret.txt
umask`,
    points: 150,
    check: {
      prompt: "After changing owner to root and setting permissions to `700`, paste the output of `ls -l ~/cyber_lab/secret.txt`.",
      hint: "The output should start with `-rwx------` and show `root` as the owner. Use `sudo chown root secret.txt` and `chmod 700 secret.txt`.",
      validation: {
        type: "regex",
        pattern: "^-rwx------\\s+1\\s+root\\s+root\\s+.*secret.txt$",
        flags: "m"
      }
    }
  },

  {
    day: 4,
    title: "Day 4: Special Permissions (Sticky Bit, SGID, SUID)",
    topic: "Enhanced file permissions for shared environments.",
    overview: "Explore special permissions that go beyond the basic rwx. Understand Sticky Bit for shared directories, SGID for group ownership, and SUID for elevated execution.",
    reading: [
      "LinuxCheatSheet.pdf (Pages 34-36: Stickybit, GID & SID)",
      { text: "SUID, SGID, Sticky Bit Explained", href: "https://linuxjourney.com/lesson/suid-sgid-sticky-bit" }
    ],
    vm_tasks: [
      "Create a shared directory: `sudo mkdir /shared_data`.",
      "Set sticky bit on `/shared_data`: `sudo chmod +t /shared_data`.",
      "As your current user, create `file1.txt` in `/shared_data`. Try to delete it (should work).",
      "Log in as `root` (or `sudo su -`), create `file2.txt` in `/shared_data`. Switch back to your user and try to delete `file2.txt` (should fail).",
      "Identify a command with the SUID bit (e.g., `passwd` or `sudo find / -perm /4000 2>/dev/null`)."
    ],
    code_snippet: `sudo mkdir /shared_data
sudo chmod +t /shared_data
ls -ld /shared_data

# As your user
touch /shared_data/file1.txt
rm /shared_data/file1.txt # This should work

# As root (sudo su -)
sudo touch /shared_data/file2.txt
# Exit root (exit)

# As your user
rm /shared_data/file2.txt # This should fail

find / -perm /4000 2>/dev/null`, // Find SUID files (output might be long)
    points: 150,
    check: {
      prompt: "After setting the sticky bit on `/shared_data`, paste the output of `ls -ld /shared_data`.",
      hint: "The permissions should end with a 't' if the sticky bit is set (e.g., `drwxrwxrwt`).",
      validation: {
        type: "regex",
        pattern: "^drwxrwxrwt.* /shared_data/?$",
        flags: "m"
      }
    }
  },

  {
    day: 5,
    title: "Day 5: Linux Process Management",
    topic: "Monitoring, controlling, and prioritizing processes.",
    overview: "Understand how processes work in Linux. Learn to view running processes, identify their states, send signals to terminate them, and adjust their priority.",
    reading: [
      "LinuxCheatSheet.pdf (Pages 26-32: System Processes, PS Command, Kill, Nice & Renice)",
      { text: "Linux Process Management (external)", href: "https://www.tecmint.com/manage-processes-in-linux/" }
    ],
    vm_tasks: [
      "Run `sleep 600` in the background (using `&`).",
      "Use `ps aux` and `top` to find the `sleep` process.",
      "Kill the `sleep` process using `kill <PID>` and verify it's gone.",
      "Start a low-priority process: `nice -n 15 dd if=/dev/zero of=/dev/null &`.",
      "Use `renice` to change its priority to `19`. Verify with `top` or `ps -l`."
    ],
    code_snippet: `sleep 600 &
ps aux | grep sleep
top
kill <PID_of_sleep_process> # Replace <PID>
ps aux | grep sleep # Verify it's gone

nice -n 15 dd if=/dev/zero of=/dev/null &
PID_OF_DD=$! # Get PID of dd
renice -n 19 -p $PID_OF_DD
ps -l $PID_OF_DD
kill $PID_OF_DD`,
    points: 150,
    check: {
      prompt: "After starting `dd` with `nice -n 15` and then `renice`ing it to `19`, paste the output of `ps -l <PID_of_dd>` (replace PID with actual value).",
      hint: "The output of `ps -l` for the `dd` process should show a 'NI' (Nice) value of `19`.",
      validation: {
        type: "regex",
        pattern: ".*\\s+NI\\s+19\\s+.*", // Looking for 'NI 19'
        flags: "m"
      }
    }
  },

  {
    day: 6,
    title: "Day 6: Linux System & Network Basics",
    topic: "systemctl, firewall-cmd, ip, ping, hostnamectl.",
    overview: "Manage system services, configure firewalls, and understand basic network commands crucial for remote access and security.",
    reading: [
      "LinuxCheatSheet.pdf (Pages 42-43: Systemctl)",
      "LinuxCheatSheet.pdf (Pages 78-81: Network Connections, Firewall)",
      { text: "Systemd Essentials (external)", href: "https://www.digitalocean.com/community/tutorials/systemd-essentials-working-with-services-units-and-the-journal" }
    ],
    vm_tasks: [
      "Check SSH service status: `systemctl status ssh`.",
      "If SSH is not running, start it: `sudo systemctl start ssh`.",
      "Check default firewall zone: `firewall-cmd --get-default-zone`.",
      "List all firewall rules: `sudo firewall-cmd --list-all`.",
      "Add HTTP and HTTPS services permanently to your default zone.",
      "Reload firewall: `sudo firewall-cmd --reload`.",
      "Check your IP address: `ip a`.",
      "Ping `google.com`."
    ],
    code_snippet: `systemctl status ssh
sudo systemctl start ssh # If needed
sudo firewall-cmd --get-default-zone
sudo firewall-cmd --list-all
sudo firewall-cmd --add-service=http --permanent
sudo firewall-cmd --add-service=https --permanent
sudo firewall-cmd --reload
sudo firewall-cmd --list-all # Verify changes
ip a
ping -c 4 google.com`,
    points: 150,
    check: {
      prompt: "After adding HTTP/HTTPS services, paste the output of `sudo firewall-cmd --list-all` for your default zone (e.g., `public`).",
      hint: "Make sure 'http' and 'https' are listed under 'services:' for your default zone. The zone name might vary (e.g., 'public', 'fedora workstation').",
      validation: {
        type: "regex",
        pattern: ".*services:.*?http.*?https.*",
        flags: "ims" // Case-insensitive, multiline, dotall (for potential newlines)
      }
    }
  },

  {
    day: 7,
    title: "Day 7: Linux Searching & Wildcards",
    topic: "find, grep, and shell pattern matching.",
    overview: "Efficiently locate files and text within files using `find` and `grep`. Master shell wildcards (`*`, `?`, `[]`, `{}`) for powerful pattern matching.",
    reading: [
      "LinuxCheatSheet.pdf (Pages 11-14: Mastering Searching, Grep, Grep with Regex)",
      { text: "Practical Grep Usage", href: "https://www.digitalocean.com/community/tutorials/how-to-use-grep-command-in-linux" }
    ],
    vm_tasks: [
      "In `~/cyber_lab`, create several dummy files: `a_log.txt`, `b_report.pdf`, `c_secret.log`, `d_data.txt`.",
      "Find all `.txt` files in `~/cyber_lab` using `find`.",
      "Find files with `_` in their name in `~/cyber_lab` using `ls` with wildcards.",
      "Using `grep`, search for the word 'root' (case-insensitive) in `/etc/passwd` and show line numbers.",
      "Search for lines in `/etc/passwd` that start with 'a' or 'z' using `grep -E` (extended regex)."
    ],
    code_snippet: `cd ~/cyber_lab
touch a_log.txt b_report.pdf c_secret.log d_data.txt
find . -name "*.txt"
ls *_log.*
grep -ni "root" /etc/passwd | head -n 5 # Show first 5 matches
grep -E "^(a|z)" /etc/passwd | head -n 5`,
    points: 100,
    check: {
      prompt: "Paste the output of `find ~/cyber_lab -iname "*.txt"` after creating the dummy files.",
      hint: "The output should list 'a_log.txt' and 'd_data.txt' from your `~/cyber_lab` directory.",
      validation: {
        type: "includesAll",
        values: ["a_log.txt", "d_data.txt", "cyber_lab"], // Ensure both files are listed within the cyber_lab context
        normalize: "trimLowerCollapse"
      }
    }
  },

  {
    day: 8,
    title: "Day 8: Linux Users & Group Management",
    topic: "Managing user accounts, passwords, and groups.",
    overview: "Learn to create, modify, and delete user accounts and groups. Understand the importance of `/etc/passwd`, `/etc/shadow`, and `/etc/group` for system security.",
    reading: [
      "LinuxCheatSheet.pdf (Pages 19-23: User and Group Management, Password Info)",
      { text: "User Management in Linux", href: "https://www.tecmint.com/add-delete-users-and-groups-in-linux/" }
    ],
    vm_tasks: [
      "Create a new user named `pentester` with a strong password.",
      "Create a new group named `security_ops`.",
      "Add `pentester` to the `security_ops` group as a supplementary group.",
      "Verify user and group existence using `id pentester` and `cat /etc/group | grep security_ops`.",
      "Lock the `pentester` account and try to log in (should fail).",
      "Unlock `pentester` and force password change on next login."
    ],
    code_snippet: `sudo useradd -m pentester
sudo passwd pentester # Set a password
sudo groupadd security_ops
sudo usermod -aG security_ops pentester
id pentester
cat /etc/group | grep security_ops
sudo usermod -L pentester # Lock account
# Try su - pentester (should fail)
sudo usermod -U pentester # Unlock account
sudo chage -d 0 pentester # Force password change on next login`,
    points: 150,
    check: {
      prompt: "After creating user `pentester` and group `security_ops`, and adding `pentester` to `security_ops`, paste the output of `id pentester`.",
      hint: "The `id pentester` output should show `pentester`'s UID, GID, and list `security_ops` in the groups.",
      validation: {
        type: "includesAll",
        values: ["uid=", "pentester", "gid=", "groups=", "security_ops"],
        normalize: "trimLowerCollapse"
      }
    }
  },

  {
    day: 9,
    title: "Day 9: Linux Repositories & Package Management (YUM/DNF)",
    topic: "Installing, updating, and removing software.",
    overview: "Understand how Linux systems manage software packages. Learn to configure repositories, and use `yum` or `dnf` to install, update, and remove applications safely.",
    reading: [
      "LinuxCheatSheet.pdf (Pages 37-39: Configuring Repos, Master YUM)",
      { text: "DNF vs YUM (external)", href: "https://www.linuxtechi.com/dnf-vs-yum-package-manager-commands/" }
    ],
    vm_tasks: [
      "Refresh package lists: `sudo yum clean all` (if using CentOS/RHEL) or `sudo apt update` (if using Debian/Ubuntu/Kali).",
      "Search for the `nmap` package.",
      "Install `nmap` (if not already installed).",
      "Verify `nmap` installation by checking its version.",
      "Remove `nmap`."
    ],
    code_snippet: `# For CentOS/RHEL/Fedora (use dnf if available):
# sudo dnf clean all
# sudo dnf search nmap
# sudo dnf install nmap -y
# nmap --version
# sudo dnf remove nmap -y

# For Debian/Ubuntu/Kali:
sudo apt update
sudo apt search nmap
sudo apt install nmap -y
nmap --version
sudo apt remove nmap -y`,
    points: 100,
    check: {
      prompt: "After installing `nmap`, paste the output of `nmap --version`.",
      hint: "The output should start with 'Nmap version' followed by the version number.",
      validation: {
        type: "regex",
        pattern: "^Nmap version\\s+[0-9.]+",
        flags: "m"
      }
    }
  },

  {
    day: 10,
    title: "Day 10: Introduction to SELinux",
    topic: "Security-Enhanced Linux basics.",
    overview: "Get an initial understanding of SELinux, a mandatory access control security mechanism. Learn about its modes, context, and basic commands for managing policies.",
    reading: [
      "LinuxCheatSheet.pdf (Pages 53-59: SELinux, SELinux Modes, Booleans)",
      { text: "SELinux for Beginners (external)", href: "https://linuxconfig.org/how-to-disable-selinux-on-centos-8-rhel-8-fedora-31" }
    ],
    vm_tasks: [
      "Check current SELinux status and mode: `sestatus` and `getenforce`.",
      "Switch SELinux to `Permissive` mode temporarily: `sudo setenforce 0`.",
      "Verify the mode change.",
      "List some common SELinux booleans: `sudo getsebool -a | head -n 5`.",
      "Temporarily enable `httpd_can_network_connect`: `sudo setsebool httpd_can_network_connect on`.",
      "Check if it's enabled.",
      "Switch SELinux back to `Enforcing` (if it was): `sudo setenforce 1`."
    ],
    code_snippet: `sestatus
getenforce
sudo setenforce 0
getenforce
sudo getsebool -a | head -n 5
sudo setsebool httpd_can_network_connect on
sudo getsebool httpd_can_network_connect
sudo setenforce 1 # Or your original state`,
    points: 150,
    check: {
      prompt: "After switching to `Permissive` mode and then back, paste the output of `getenforce` (it should reflect the mode you ended in, ideally 'Enforcing' for a secure system, or 'Permissive' if you left it there).",
      hint: "The command `getenforce` simply returns 'Enforcing', 'Permissive', or 'Disabled'.",
      validation: {
        type: "oneOf", // Accept either Permissive or Enforcing as a valid end state
        values: ["Permissive", "Enforcing"]
      }
    }
  },

  // --- Month 1: Remaining Days (Placeholders) ---
  { day: 11, title: "Day 11: Linux Disk Partitioning (fdisk, LVM)", topic: "Managing storage volumes for flexible setups.", overview: "TODO: Create, resize, and delete partitions and logical volumes using fdisk and LVM tools.", reading: ["LinuxCheatSheet.pdf (Pages 60-70: Disk Partitioning, Logical Volume)"] },
  { day: 12, title: "Day 12: Bash Scripting - Variables & Input", topic: "Automating tasks with shell scripts.", overview: "TODO: Write your first Bash scripts, declare variables, and take user input.", reading: ["LinuxCheatSheet.pdf (Pages 82-84: Shell Scripting)"] },
  { day: 13, title: "Day 13: Bash Scripting - Conditionals (if/else)", topic: "Adding logic to your scripts.", overview: "TODO: Implement conditional statements (`if`, `elif`, `else`) using operators and file checks.", reading: ["LinuxCheatSheet.pdf (Pages 86-91: Shell Scripting Day03)"] },
  { day: 14, title: "Day 14: Bash Scripting - Loops (for/while)", topic: "Repeating tasks efficiently.", overview: "TODO: Use `for` and `while` loops to iterate over data and automate repetitive actions.", reading: ["LinuxCheatSheet.pdf (Pages 92-95: Shell Scripting Day04)"] },
  { day: 15, title: "Day 15: Introduction to Cron Jobs", topic: "Scheduling automated tasks.", overview: "TODO: Schedule commands and scripts to run at specific times or intervals using `cron`.", reading: ["LinuxCheatSheet.pdf (Practice Questions Day 71 - Q1)"] },
  { day: 16, title: "Day 16: Secure File Transfer (SSH, SCP, SFTP)", topic: "Transferring files securely between systems.", overview: "TODO: Use SSH for remote login, and SCP/SFTP for secure file transfers.", reading: ["LinuxCheatSheet.pdf (Pages 49-52: Why SSH?, SCP, SFTP)"] },
  { day: 17, title: "Day 17: SSH Key-based Authentication", topic: "Passwordless and more secure SSH access.", overview: "TODO: Set up SSH key pairs for secure, passwordless authentication to remote servers.", reading: [] },
  { day: 18, title: "Day 18: Linux Hardening Best Practices", topic: "Securing your Linux system.", overview: "TODO: Implement initial hardening steps for a production-ready Linux machine.", reading: [] },
  { day: 19, title: "Day 19: Vulnerability Scanning Intro (Nmap)", topic: "Basic network reconnaissance.", overview: "TODO: Use Nmap to discover hosts, open ports, and services on a target network.", reading: [] },
  { day: 20, title: "Day 20: Firewall Advanced Concepts", topic: "In-depth firewall configuration.", overview: "TODO: Configure complex firewall rules, including NAT and port forwarding.", reading: ["LinuxCheatSheet.pdf (Pages 80-81: Firewall)"] },
  { day: 21, title: "Day 21: Networking Fundamentals Review", topic: "IP addressing, routing, and common protocols.", overview: "TODO: Review core networking concepts critical for ethical hacking. (Refer to your IT course if needed)", reading: ["LinuxCheatSheet.pdf (Page 77: Network Connections - external IT course link)"] },
  { day: 22, title: "Day 22: Practical Nmap Scanning Techniques", topic: "Advanced Nmap options for thorough reconnaissance.", overview: "TODO: Explore different Nmap scan types, timing templates, and output formats.", reading: [] },
  { day: 23, title: "Day 23: Introduction to Wireshark/Tcpdump", topic: "Network traffic analysis basics.", overview: "TODO: Capture and analyze network packets to understand communication protocols.", reading: [] },
  { day: 24, title: "Day 24: DNS Fundamentals for Hacking", topic: "Understanding DNS records and enumeration.", overview: "TODO: Learn how DNS works and techniques to enumerate DNS records for target mapping.", reading: [] },
  { day: 25, title: "Day 25: HTTP/S Basics & Web Proxies", topic: "Understanding web traffic and using Burp Suite.", overview: "TODO: Deep dive into HTTP/S, request/response structures, and setting up a web proxy like Burp Suite Community.", reading: [] },
  { day: 26, title: "Day 26: Web Server Basics (Apache/Nginx)", topic: "Setting up and securing web servers.", overview: "TODO: Install and configure a basic web server (Apache/Nginx) and understand its common vulnerabilities.", reading: [] },
  { day: 27, title: "Day 27: Introduction to Web Application Vulnerabilities", topic: "SQL Injection, XSS, etc. overview.", overview: "TODO: Get an overview of common web app flaws from OWASP Top 10.", reading: [] },
  { day: 28, title: "Day 28: Virtual Hacking Lab Setup Review", topic: "Ensuring your lab is ready.", overview: "TODO: Final check of your attack and target VMs, network configuration, and essential tools.", reading: [] },
  { day: 29, title: "Day 29: Python for Security - Basics", topic: "Variables, data types, and control flow.", overview: "TODO: Start coding in Python, essential for automation and exploit development.", reading: [] },
  { day: 30, title: "Day 30: Python for Security - Functions & Modules", topic: "Organizing code and reusing functionality.", overview: "TODO: Learn to write functions and import modules to create more complex scripts.", reading: [] },

  // --- Month 2: Reconnaissance & Scanning ---
  { day: 31, title: "Day 31: Python for Security - Network Sockets", topic: "Building simple network clients/servers.", overview: "TODO: Write Python scripts to interact with network services at a low level.", reading: [] },
  { day: 32, title: "Day 32: Python for Security - File I/O & Error Handling", topic: "Reading/writing files and robust scripting.", overview: "TODO: Manage files and gracefully handle errors in your Python scripts.", reading: [] },
  { day: 33, title: "Day 33: Python for Security - Scapy Introduction", topic: "Crafting and sniffing network packets.", overview: "TODO: Use Scapy to create custom packets and analyze network traffic.", reading: [] },
  { day: 34, title: "Day 34: Advanced Nmap - Scripting Engine (NSE)", topic: "Automated vulnerability detection with Nmap.", overview: "TODO: Explore and utilize Nmap Scripting Engine for advanced scans.", reading: [] },
  { day: 35, title: "Day 35: Host Discovery Techniques", topic: "Finding active hosts on a network.", overview: "TODO: Various methods for identifying live targets, beyond simple ping sweeps.", reading: [] },
  { day: 36, title: "Day 36: Port Scanning Methodologies", topic: "Understanding different scan types and their implications.", overview: "TODO: Deep dive into TCP SYN, FIN, XMAS, UDP scans, and stealth techniques.", reading: [] },
  { day: 37, title: "Day 37: Service & Version Detection", topic: "Identifying software running on open ports.", overview: "TODO: Accurately fingerprint services to tailor attack vectors.", reading: [] },
  { day: 38, title: "Day 38: OS Fingerprinting", topic: "Identifying target operating systems.", overview: "TODO: Techniques to determine the OS of remote hosts for targeted exploitation.", reading: [] },
  { day: 39, title: "Day 39: Vulnerability Scanning Tools (OpenVAS/Nessus)", topic: "Automated vulnerability assessment.", overview: "TODO: Set up and run vulnerability scanners to identify known flaws.", reading: [] },
  { day: 40, title: "Day 40: Manual Vulnerability Verification", topic: "Confirming scanner findings.", overview: "TODO: Learn to manually verify vulnerabilities reported by automated scanners.", reading: [] },
  { day: 41, title: "Day 41: Web Enumeration (DirBuster/Gobuster)", topic: "Discovering hidden files and directories.", overview: "TODO: Use directory brute-forcing tools to uncover sensitive web content.", reading: [] },
  { day: 42, title: "Day 42: Subdomain Enumeration", topic: "Finding associated subdomains.", overview: "TODO: Techniques to discover subdomains for a broader attack surface.", reading: [] },
  { day: 43, title: "Day 43: Google Dorking & OSINT Basics", topic: "Leveraging public search engines for information gathering.", overview: "TODO: Use advanced Google searches and other OSINT tools to find valuable intelligence.", reading: [] },
  { day: 44, title: "Day 44: Email & User Enumeration", topic: "Gathering potential usernames and email addresses.", overview: "TODO: Techniques for identifying valid email accounts and user names on a target.", reading: [] },
  { day: 45, title: "Day 45: Social Engineering Principles", topic: "Understanding human vulnerabilities.", overview: "TODO: Introduction to the psychological aspects of social engineering attacks.", reading: [] },
  { day: 46, title: "Day 46: Active Directory Reconnaissance", topic: "Initial AD information gathering.", overview: "TODO: Basics of enumerating Active Directory structures and user/group information.", reading: [] },
  { day: 47, title: "Day 47: SMB/RPC Enumeration", topic: "Discovering Windows shares and services.", overview: "TODO: Techniques for finding exposed SMB shares and RPC endpoints.", reading: [] },
  { day: 48, title: "Day 48: SNMP Enumeration", topic: "Gathering information from network devices.", overview: "TODO: Exploiting SNMP for network mapping and sensitive data leakage.", reading: [] },
  { day: 49, title: "Day 49: Database Enumeration (SQL)", topic: "Identifying database systems and their versions.", overview: "TODO: Initial steps to discover and fingerprint database services.", reading: [] },
  { day: 50, title: "Day 50: Review & Mini-Project: Full Recon", topic: "Applying all reconnaissance techniques.", overview: "TODO: A hands-on project to perform comprehensive reconnaissance on a target.", reading: [] },

  // --- Month 3: Exploitation - Web Applications & Client-Side ---
  { day: 51, title: "Day 51: SQL Injection (Basic)", topic: "Exploiting database vulnerabilities.", overview: "TODO: Learn to perform basic SQL Injection attacks to extract data from databases.", reading: [] },
  { day: 52, title: "Day 52: SQL Injection (Advanced) & SQLMap", topic: "Automated SQLi and advanced techniques.", overview: "TODO: Use SQLMap for automated SQL Injection and explore UNION-based, blind SQLi.", reading: [] },
  { day: 53, title: "Day 53: Cross-Site Scripting (XSS) - Reflected", topic: "Injecting client-side scripts.", overview: "TODO: Understand and exploit reflected XSS vulnerabilities.", reading: [] },
  { day: 54, title: "Day 54: Cross-Site Scripting (XSS) - Stored & DOM", topic: "Persistent and DOM-based XSS attacks.", overview: "TODO: Exploit stored and DOM-based XSS for more impactful attacks.", reading: [] },
  { day: 55, title: "Day 55: Cross-Site Request Forgery (CSRF)", topic: "Tricking users into unintended actions.", overview: "TODO: Understand and exploit CSRF vulnerabilities to perform actions on behalf of other users.", reading: [] },
  { day: 56, title: "Day 56: Broken Authentication & Session Management", topic: "Exploiting weak authentication mechanisms.", overview: "TODO: Attack weak password policies, session hijacking, and insecure session IDs.", reading: [] },
  { day: 57, title: "Day 57: Insecure Direct Object References (IDOR)", topic: "Accessing unauthorized resources.", overview: "TODO: Exploit IDOR to access or modify resources without proper authorization.", reading: [] },
  { day: 58, title: "Day 58: Security Misconfiguration", topic: "Exploiting default or incorrect configurations.", overview: "TODO: Identify and exploit common security misconfigurations in web applications and servers.", reading: [] },
  { day: 59, title: "Day 59: XML External Entities (XXE)", topic: "Exploiting XML parsing vulnerabilities.", overview: "TODO: Understand and exploit XXE attacks to read files, perform SSRF, or execute code.", reading: [] },
  { day: 60, title: "Day 60: File Upload Vulnerabilities", topic: "Exploiting insecure file upload mechanisms.", overview: "TODO: Upload malicious files (e.g., web shells) to gain remote code execution.", reading: [] },
  { day: 61, title: "Day 61: Server-Side Request Forgery (SSRF)", topic: "Forcing the server to make requests.", overview: "TODO: Exploit SSRF to access internal resources or scan internal networks.", reading: [] },
  { day: 62, title: "Day 62: Remote Code Execution (RCE) via Web", topic: "Executing commands on the target server.", overview: "TODO: Understand various paths to RCE through web vulnerabilities (e.g., command injection).", reading: [] },
  { day: 63, title: "Day 63: Logic Flaws in Web Applications", topic: "Bypassing business logic.", overview: "TODO: Identify and exploit flaws in the application's business logic, leading to unauthorized actions or financial gains.", reading: [] },
  { day: 64, title: "Day 64: API Hacking Fundamentals", topic: "Testing REST/SOAP APIs.", overview: "TODO: Understand how to test APIs for common vulnerabilities.", reading: [] },
  { day: 65, title: "Day 65: JWT Vulnerabilities", topic: "Exploiting JSON Web Tokens.", overview: "TODO: Identify and exploit weaknesses in JWT implementations (e.g., none algorithm, weak keys).", reading: [] },
  { day: 66, title: "Day 66: Clickjacking", topic: "Tricking users with UI redressing.", overview: "TODO: Understand and demonstrate clickjacking attacks to manipulate user actions.", reading: [] },
  { day: 67, title: "Day 67: OAuth/OpenID Connect Vulnerabilities", topic: "Attacking modern authentication flows.", overview: "TODO: Explore common security flaws in OAuth and OpenID Connect implementations.", reading: [] },
  { day: 68, title: "Day 68: Client-Side Template Injection (CSTI)", topic: "Injecting code into client-side templates.", overview: "TODO: Exploit CSTI in frameworks like AngularJS, Vue.js.", reading: [] },
  { day: 69, "title": "Day 69: Client-Side Prototype Pollution", topic: "Manipulating JavaScript prototypes.", overview: "TODO: Understand and exploit Prototype Pollution in JavaScript applications.", reading: [] },
  { day: 70, title: "Day 70: Review & Mini-Project: Web App Attack", topic: "Comprehensive web application penetration test.", overview: "TODO: Perform a full penetration test on a vulnerable web application.", reading: [] },
  { day: 71, title: "Day 71: Basic Buffer Overflows", topic: "Understanding memory corruption.", overview: "TODO: Learn the fundamentals of stack-based buffer overflows and simple exploitation.", reading: [] },
  { day: 72, title: "Day 72: Reverse Shells & Bind Shells", topic: "Establishing remote access.", overview: "TODO: Understand and create reverse and bind shells for command and control.", reading: [] },

  // --- Month 4: Exploitation - System & Network ---
  { day: 73, title: "Day 73: Metasploit Framework - Basics", topic: "Introduction to automated exploitation.", overview: "TODO: Get started with Metasploit, modules, payloads, and basic exploitation.", reading: [] },
  { day: 74, title: "Day 74: Metasploit - Payloads & Encoders", topic: "Customizing exploit payloads.", overview: "TODO: Work with different Metasploit payloads, encoders, and handlers.", reading: [] },
  { day: 75, title: "Day 75: Metasploit - Post-Exploitation", topic: "Pivoting and persistent access.", overview: "TODO: Use Meterpreter for post-exploitation activities, privilege escalation, and lateral movement.", reading: [] },
  { day: 76, title: "Day 76: Privilege Escalation - Linux", topic: "Gaining root access on Linux systems.", overview: "TODO: Explore common Linux privilege escalation techniques (SUID, kernel exploits, misconfigurations).", reading: [] },
  { day: 77, title: "Day 77: Privilege Escalation - Windows", topic: "Gaining System/Admin access on Windows.", overview: "TODO: Explore common Windows privilege escalation techniques (kernel exploits, service misconfigs, DLL hijacking).", reading: [] },
  { day: 78, title: "Day 78: Password Attacks - Brute-forcing & Dictionary", topic: "Cracking passwords for various services.", overview: "TODO: Use tools like Hydra and Medusa for online password attacks.", reading: [] },
  { day: 79, title: "Day 79: Password Attacks - Rainbow Tables & Hash Cracking", topic: "Offline password cracking with hashes.", overview: "TODO: Understand rainbow tables and use tools like Hashcat/John the Ripper for offline cracking.", reading: [] },
  { day: 80, title: "Day 80: Pass the Hash & Pass the Ticket", topic: "Windows authentication attacks.", overview: "TODO: Learn to reuse NTLM hashes and Kerberos tickets for lateral movement.", reading: [] },
  { day: 81, title: "Day 81: ARP Spoofing & MITM Attacks", topic: "Interception of local network traffic.", overview: "TODO: Perform ARP spoofing to intercept traffic and conduct Man-in-the-Middle attacks.", reading: [] },
  { day: 82, title: "Day 82: DNS Spoofing", topic: "Redirecting domain requests.", overview: "TODO: Conduct DNS spoofing to redirect users to malicious websites.", reading: [] },
  { day: 83, title: "Day 83: SMB Relay Attacks", topic: "Relaying authentication attempts.", overview: "TODO: Exploit SMB relay vulnerabilities to gain access to Windows systems.", reading: [] },
  { day: 84, title: "Day 84: LLMNR/NBT-NS Poisoning", topic: "Network name resolution attacks.", overview: "TODO: Use tools like Responder to capture credentials via name resolution poisoning.", reading: [] },
  { day: 85, title: "Day 85: VPN Hacking Fundamentals", topic: "Attacking Virtual Private Networks.", overview: "TODO: Understand VPN protocols and common vulnerabilities in VPN implementations.", reading: [] },
  { day: 86, title: "Day 86: Wireless Network Hacking (WPA/WPA2)", topic: "Cracking Wi-Fi passwords.", overview: "TODO: Use Aircrack-ng suite to crack WPA/WPA2 pre-shared keys.", reading: [] },
  { day: 87, title: "Day 87: Wireless Network Hacking (EAP/Enterprise)", topic: "Attacking enterprise Wi-Fi.", overview: "TODO: Understand and attack more complex enterprise Wi-Fi authentication methods.", reading: [] },
  { day: 88, title: "Day 88: Bluetooth & RFID/NFC Hacking (Intro)", topic: "Exploring close-range wireless attacks.", overview: "TODO: Introduction to vulnerabilities in Bluetooth and RFID/NFC communication.", reading: [] },
  { day: 89, title: "Day 89: Cloud Security Fundamentals (AWS/Azure)", topic: "Basic cloud environment hacking.", overview: "TODO: Understand basic cloud service misconfigurations and common attack vectors.", reading: [] },
  { day: 90, title: "Day 90: Review & Mini-Project: Network Attack", topic: "Simulated internal network compromise.", overview: "TODO: A comprehensive project involving network enumeration, exploitation, and post-exploitation.", reading: [] },

  // --- Month 5: Post-Exploitation & Advanced Topics ---
  { day: 91, title: "Day 91: Data Exfiltration Techniques", topic: "Stealing data securely.", overview: "TODO: Methods to extract sensitive data from compromised systems without detection.", reading: [] },
  { day: 92, title: "Day 92: Maintaining Access (Persistence)", topic: "Ensuring long-term access to compromised systems.", overview: "TODO: Install backdoors, rootkits, and other persistence mechanisms on targets.", reading: [] },
  { day: 93, title: "Day 93: Lateral Movement & Pivoting", topic: "Moving deeper into the network.", overview: "TODO: Techniques to navigate through internal networks from a compromised host.", reading: [] },
  { day: 94, title: "Day 94: Anti-Forensics & Evasion", topic: "Hiding your tracks.", overview: "TODO: Methods to bypass detection, clear logs, and obscure attacker activity.", reading: [] },
  { day: 95, "title": "Day 95: Understanding Rootkits & Bootkits", topic: "Deep system compromise.", overview: "TODO: Explore how rootkits and bootkits operate to maintain stealthy control.", reading: [] },
  { day: 96, "title": "Day 96: Introduction to Malware Analysis", topic: "Static and dynamic analysis basics.", overview: "TODO: Learn foundational techniques to analyze malicious software.", reading: [] },
  { day: 97, "title": "Day 97: Red Teaming & Adversary Simulation", topic: "Advanced attack exercises.", overview: "TODO: Introduction to red teaming principles and simulating real-world threats.", reading: [] },
  { day: 98, "title": "Day 98: OSINT Tools & Techniques (Advanced)", topic: "Deep dive into Open Source Intelligence.", overview: "TODO: Utilize advanced OSINT tools and methodologies for target profiling.", reading: [] },
  { day: 99, "title": "Day 99: Social Engineering (Advanced)", topic: "Crafting sophisticated social attacks.", overview: "TODO: Learn advanced social engineering techniques, including phishing and pretexting.", reading: [] },
  { day: 100, title: "Day 100: Exploit Development - Fuzzing", topic: "Finding vulnerabilities automatically.", overview: "TODO: Use fuzzing techniques to uncover crashes and potential vulnerabilities in software.", reading: [] },
  { day: 101, title: "Day 101: Exploit Development - Shellcoding", topic: "Writing custom payloads.", overview: "TODO: Learn to write shellcode in assembly for various architectures.", reading: [] },
  { day: 102, title: "Day 102: Exploit Development - Debuggers (GDB/Immunity)", topic: "Analyzing program execution.", overview: "TODO: Use debuggers to analyze crashes and reverse engineer binaries.", reading: [] },
  { day: 103, title: "Day 103: Exploit Development - Return-Oriented Programming (ROP)", topic: "Bypassing W^X protections.", overview: "TODO: Understand and implement ROP chains to execute arbitrary code.", reading: [] },
  { day: 104, title: "Day 104: Exploit Development - Heap Overflows", topic: "Attacking dynamic memory.", overview: "TODO: Learn about heap-based vulnerabilities and their exploitation.", reading: [] },
  { day: 105, title: "Day 105: Introduction to Reverse Engineering", topic: "Analyzing binaries without source code.", overview: "TODO: Use tools like Ghidra/IDA Pro to understand compiled programs.", reading: [] },
  { day: 106, title: "Day 106: Mobile Hacking (Android) - Rooting/Jailbreaking", topic: "Gaining control over mobile devices.", overview: "TODO: Understand how to root Android devices and the associated security implications.", reading: [] },
  { day: 107, title: "Day 107: Mobile Hacking (Android) - App Analysis (Static)", topic: "Analyzing Android app binaries.", overview: "TODO: Perform static analysis of APKs to find vulnerabilities.", reading: [] },
  { day: 108, title: "Day 108: Mobile Hacking (Android) - App Analysis (Dynamic)", topic: "Runtime analysis of Android apps.", overview: "TODO: Use tools like Frida to hook into running Android applications.", reading: [] },
  { day: 109, title: "Day 109: Mobile Hacking (iOS) - Basics", topic: "Introduction to iOS security.", overview: "TODO: Understand iOS security model and common vulnerabilities.", reading: [] },
  { day: 110, title: "Day 110: IoT Hacking Fundamentals", topic: "Attacking embedded devices.", overview: "TODO: Basic steps to analyze and exploit vulnerabilities in IoT devices.", reading: [] },
  { day: 111, title: "Day 111: Industrial Control System (ICS) Security (Intro)", topic: "Hacking SCADA/DCS systems.", overview: "TODO: Introduction to SCADA systems and their unique security challenges.", reading: [] },
  { day: 112, title: "Day 112: Malware Persistence & Stealth Techniques", topic: "Advanced methods for maintaining hidden access.", overview: "TODO: Explore sophisticated persistence mechanisms and evasion strategies.", reading: [] },
  { day: 113, title: "Day 113: Memory Forensics (Volatility Framework)", topic: "Analyzing RAM dumps for artifacts.", overview: "TODO: Use Volatility to extract forensic artifacts from memory images.", reading: [] },
  { day: 114, title: "Day 114: Log Analysis & SIEM Introduction", topic: "Detecting malicious activity through logs.", overview: "TODO: Understand log sources and basic SIEM (Security Information and Event Management) principles.", reading: [] },
  { day: 115, title: "Day 115: Threat Modeling & Risk Assessment", topic: "Identifying and prioritizing threats.", overview: "TODO: Learn structured approaches to threat modeling and risk assessment.", reading: [] },
  { day: 116, title: "Day 116: Incident Response Process", topic: "Responding to security breaches.", overview: "TODO: Understand the phases of incident response and basic containment strategies.", reading: [] },
  { day: 117, title: "Day 117: Ethical Hacking Reporting & Documentation", topic: "Communicating findings effectively.", overview: "TODO: Learn to write professional penetration test reports and recommendations.", reading: [] },
  { day: 118, title: "Day 118: Legal & Ethical Aspects of Hacking", topic: "Rules of engagement and legal boundaries.", overview: "TODO: Understand the legal framework and ethical responsibilities of a cybersecurity professional.", reading: [] },
  { day: 119, title: "Day 119: Capture The Flag (CTF) Practice", topic: "Applying skills in competitive challenges.", overview: "TODO: Solve various CTF challenges to hone your hacking skills.", reading: [] },
  { day: 120, title: "Day 120: Review & Mini-Project: Full Pen Test Simulation", topic: "A complete end-to-end simulated penetration test.", overview: "TODO: Simulate a real-world penetration test, from recon to reporting.", reading: [] },

  // --- Month 6: Certifications, Career & Deep Dive ---
  { day: 121, title: "Day 121: Certification Pathways (OSCP, CEH, PNPT)", topic: "Planning your career advancement.", overview: "TODO: Research and compare popular cybersecurity certifications and prepare for your chosen path.", reading: [] },
  { day: 122, title: "Day 122: Resume & Portfolio Building for Cybersecurity", topic: "Showcasing your skills.", overview: "TODO: Create a compelling resume and build an online portfolio to highlight your projects.", reading: [] },
  { day: 123, title: "Day 123: Interview Prep for Penetration Tester Roles", topic: "Ace your job interviews.", overview: "TODO: Practice common interview questions for penetration testing and security analyst positions.", reading: [] },
  { day: 124, title: "Day 124: Networking & Mentorship in Cybersecurity", topic: "Building connections in the industry.", overview: "TODO: Learn how to effectively network and find mentors in the cybersecurity community.", reading: [] },
  { day: 125, title: "Day 125: Advanced Persistent Threats (APTs)", topic: "Understanding sophisticated adversaries.", overview: "TODO: Study the tactics, techniques, and procedures (TTPs) of APT groups.", reading: [] },
  { day: 126, title: "Day 126: Threat Intelligence & Hunting", topic: "Proactive defense strategies.", overview: "TODO: Learn to collect, analyze, and apply threat intelligence for proactive defense.", reading: [] },
  { day: 127, title: "Day 127: Digital Forensics & Incident Response (DFIR) Advanced", topic: "Deep dive into incident handling.", overview: "TODO: Advanced concepts in digital forensics, chain of custody, and incident investigation.", reading: [] },
  { day: 128, title: "Day 128: WebAssembly (WASM) Security", topic: "Hacking modern browser environments.", overview: "TODO: Explore vulnerabilities and security considerations in WebAssembly applications.", reading: [] },
  { day: 129, title: "Day 129: Browser Exploitation Framework (BeEF)", topic: "Client-side attack vector.", overview: "TODO: Use BeEF to hook browsers and exploit client-side vulnerabilities.", reading: [] },
  { day: 130, title: "Day 130: Advanced Python for Automation & Tooling", topic: "Building custom security tools.", overview: "TODO: Develop more complex Python scripts for automation, parsing, and custom attacks.", reading: [] },
  { day: 131, title: "Day 131: Go for Security Tooling (Intro)", topic: "Learning a new language for performance.", overview: "TODO: Basic Go programming for creating fast and efficient security tools.", reading: [] },
  { day: 132, title: "Day 132: Rust for Secure Systems Programming (Intro)", topic: "Memory safety and high performance.", overview: "TODO: Understand Rust's benefits for writing secure, low-level code.", reading: [] },
  { day: 133, title: "Day 133: Container Security (Docker/Kubernetes)", topic: "Securing containerized environments.", overview: "TODO: Identify and mitigate vulnerabilities in Docker and Kubernetes deployments.", reading: [] },
  { day: 134, title: "Day 134: Serverless Security (AWS Lambda/Azure Functions)", topic: "Hacking serverless architectures.", overview: "TODO: Explore the unique security challenges and attack vectors in serverless functions.", reading: [] },
  { day: 135, title: "Day 135: DevOps Security (DevSecOps)", topic: "Integrating security into the CI/CD pipeline.", overview: "TODO: Learn principles and practices for embedding security throughout the DevOps lifecycle.", reading: [] },
  { day: 136, title: "Day 136: Blockchain & Cryptocurrency Security (Intro)", topic: "Attacking decentralized systems.", overview: "TODO: Introduction to blockchain technology and common vulnerabilities in smart contracts and crypto exchanges.", reading: [] },
  { day: 137, title: "Day 137: Quantum Cryptography (Intro)", topic: "Future of encryption.", overview: "TODO: Understand the basics of quantum computing and its implications for modern cryptography.", reading: [] },
  { day: 138, title: "Day 138: Zero-Trust Architecture", topic: "Modern security model.", overview: "TODO: Principles of Zero-Trust and how it redefines network security.", reading: [] },
  { day: 139, title: "Day 139: Adversary Emulation Frameworks (e.g., Caldera)", topic: "Automating red team operations.", overview: "TODO: Work with adversary emulation platforms to test defenses.", reading: [] },
  { day: 140, title: "Day 140: Purple Teaming (Red + Blue)", topic: "Collaborative security improvements.", overview: "TODO: Learn about purple teaming, where red and blue teams work together.", reading: [] },
  { day: 141, title: "Day 141: Car Hacking (Intro)", topic: "Automotive cybersecurity basics.", overview: "TODO: Introduction to CAN bus, ECU vulnerabilities, and tools for car hacking.", reading: [] },
  { day: 142, title: "Day 142: Medical Device Hacking (Intro)", topic: "Healthcare cybersecurity challenges.", overview: "TODO: Understanding vulnerabilities in medical devices and healthcare systems.", reading: [] },
  { day: 143, title: "Day 
