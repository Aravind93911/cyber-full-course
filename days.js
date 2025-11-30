const DAYS_DATA = [
  {
    "day": 1,
    "title": "Day 1: Computer & Internet Fundamentals",
    "topic": "Computer & Internet Fundamentals",
    "points": 100,
    "overview": "Understand how computers talk over networks: IP addresses, MAC addresses, DNS, and the idea of clients and servers. Focus on core definitions today.",
    "reading": [
      "Look up: 'What is an IP address' and 'How DNS works' (any beginner blog).",
      "Draw a client\u2013server diagram in your notebook."
    ],
    "vm_tasks": [
      "ip addr",
      "ping 8.8.8.8",
      "nslookup example.com"
    ],
    "code_snippet": "print(\"This week you mainly run shell commands; no big script needed yet.\")"
  },
  {
    "day": 2,
    "title": "Day 2: Computer & Internet Fundamentals",
    "topic": "Computer & Internet Fundamentals",
    "points": 100,
    "overview": "Understand how computers talk over networks: IP addresses, MAC addresses, DNS, and the idea of clients and servers. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Look up: 'What is an IP address' and 'How DNS works' (any beginner blog).",
      "Draw a client\u2013server diagram in your notebook."
    ],
    "vm_tasks": [
      "ip addr",
      "ping 8.8.8.8",
      "nslookup example.com"
    ],
    "code_snippet": "print(\"This week you mainly run shell commands; no big script needed yet.\")"
  },
  {
    "day": 3,
    "title": "Day 3: Networking Essentials",
    "topic": "Networking Essentials",
    "points": 100,
    "overview": "Dive into TCP/UDP, the 3-way handshake, common ports like 80,443,22 and basic routing. Focus on core definitions today.",
    "reading": [
      "Search: 'TCP vs UDP for beginners'.",
      "Read about the OSI vs TCP/IP models."
    ],
    "vm_tasks": [
      "netstat -tulnp | head",
      "traceroute google.com",
      "ip route"
    ],
    "code_snippet": "import socket\nhost = \"scanme.nmap.org\"\nport = 80\nprint(f\"Testing TCP connection to {host}:{port}\")\ntry:\n    s = socket.create_connection((host, port), timeout=3)\n    print(\"Connected!\")\n    s.close()\nexcept Exception as e:\n    print(\"Connection failed:\", e)\n"
  },
  {
    "day": 4,
    "title": "Day 4: Networking Essentials",
    "topic": "Networking Essentials",
    "points": 100,
    "overview": "Dive into TCP/UDP, the 3-way handshake, common ports like 80,443,22 and basic routing. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'TCP vs UDP for beginners'.",
      "Read about the OSI vs TCP/IP models."
    ],
    "vm_tasks": [
      "netstat -tulnp | head",
      "traceroute google.com",
      "ip route"
    ],
    "code_snippet": "import socket\nhost = \"scanme.nmap.org\"\nport = 80\nprint(f\"Testing TCP connection to {host}:{port}\")\ntry:\n    s = socket.create_connection((host, port), timeout=3)\n    print(\"Connected!\")\n    s.close()\nexcept Exception as e:\n    print(\"Connection failed:\", e)\n"
  },
  {
    "day": 5,
    "title": "Day 5: Linux & Command Line Basics",
    "topic": "Linux & Command Line Basics",
    "points": 100,
    "overview": "Get comfortable with navigating the filesystem, managing files, and understanding permissions in Linux. Focus on core definitions today.",
    "reading": [
      "Read a 'Linux basic commands cheat sheet'.",
      "Note down commands for navigation (ls, cd, pwd) and file operations (cp, mv, rm)."
    ],
    "vm_tasks": [
      "pwd",
      "ls -la",
      "cd /tmp && touch test.txt && echo 'hello' > test.txt && cat test.txt",
      "chmod 600 test.txt && ls -l test.txt"
    ],
    "code_snippet": "import os\nprint(\"Current directory:\", os.getcwd())\nprint(\"Files:\", os.listdir(\".\"))\n"
  },
  {
    "day": 6,
    "title": "Day 6: Linux & Command Line Basics",
    "topic": "Linux & Command Line Basics",
    "points": 100,
    "overview": "Get comfortable with navigating the filesystem, managing files, and understanding permissions in Linux. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Read a 'Linux basic commands cheat sheet'.",
      "Note down commands for navigation (ls, cd, pwd) and file operations (cp, mv, rm)."
    ],
    "vm_tasks": [
      "pwd",
      "ls -la",
      "cd /tmp && touch test.txt && echo 'hello' > test.txt && cat test.txt",
      "chmod 600 test.txt && ls -l test.txt"
    ],
    "code_snippet": "import os\nprint(\"Current directory:\", os.getcwd())\nprint(\"Files:\", os.listdir(\".\"))\n"
  },
  {
    "day": 7,
    "title": "Day 7: Basic Programming for Security (Python)",
    "topic": "Basic Programming for Security (Python)",
    "points": 100,
    "overview": "Use Python to automate recon tasks: loops, conditions, functions, basic network scripts. Focus on core definitions today.",
    "reading": [
      "Review Python basics: variables, loops, if-else.",
      "Look at examples of simple port scanners in Python."
    ],
    "vm_tasks": [
      "python3 -V",
      "python3 port_scan.py 192.168.56.101 20 1024   # after writing the script below"
    ],
    "code_snippet": "import socket\n\nhost = \"127.0.0.1\"\nstart, end = 20, 1024\nprint(f\"Scanning {host} from {start} to {end}\")\nfor port in range(start, end+1):\n    s = socket.socket()\n    s.settimeout(0.2)\n    try:\n        s.connect((host, port))\n    except:\n        s.close()\n        continue\n    else:\n        print(\"Open port:\", port)\n        s.close()\n"
  },
  {
    "day": 8,
    "title": "Day 8: Basic Programming for Security (Python)",
    "topic": "Basic Programming for Security (Python)",
    "points": 100,
    "overview": "Use Python to automate recon tasks: loops, conditions, functions, basic network scripts. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Review Python basics: variables, loops, if-else.",
      "Look at examples of simple port scanners in Python."
    ],
    "vm_tasks": [
      "python3 -V",
      "python3 port_scan.py 192.168.56.101 20 1024   # after writing the script below"
    ],
    "code_snippet": "import socket\n\nhost = \"127.0.0.1\"\nstart, end = 20, 1024\nprint(f\"Scanning {host} from {start} to {end}\")\nfor port in range(start, end+1):\n    s = socket.socket()\n    s.settimeout(0.2)\n    try:\n        s.connect((host, port))\n    except:\n        s.close()\n        continue\n    else:\n        print(\"Open port:\", port)\n        s.close()\n"
  },
  {
    "day": 9,
    "title": "Day 9: Operating System Internals",
    "topic": "Operating System Internals",
    "points": 100,
    "overview": "See how processes, memory, and users work. This helps you understand privilege escalation later. Focus on core definitions today.",
    "reading": [
      "Read about Linux processes and the role of PID 1.",
      "Search: 'What is a system call in OS?'."
    ],
    "vm_tasks": [
      "ps aux | head",
      "top",
      "strace ls | head",
      "id",
      "sudo useradd labuser && sudo passwd labuser"
    ],
    "code_snippet": "import os, time\nprint(\"Current PID:\", os.getpid())\nprint(\"Parent PID:\", os.getppid())\nprint(\"Sleeping for 5 seconds...\")\ntime.sleep(5)\nprint(\"Done\")\n"
  },
  {
    "day": 10,
    "title": "Day 10: Operating System Internals",
    "topic": "Operating System Internals",
    "points": 100,
    "overview": "See how processes, memory, and users work. This helps you understand privilege escalation later. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Read about Linux processes and the role of PID 1.",
      "Search: 'What is a system call in OS?'."
    ],
    "vm_tasks": [
      "ps aux | head",
      "top",
      "strace ls | head",
      "id",
      "sudo useradd labuser && sudo passwd labuser"
    ],
    "code_snippet": "import os, time\nprint(\"Current PID:\", os.getpid())\nprint(\"Parent PID:\", os.getppid())\nprint(\"Sleeping for 5 seconds...\")\ntime.sleep(5)\nprint(\"Done\")\n"
  },
  {
    "day": 11,
    "title": "Day 11: Web Technologies & HTTP",
    "topic": "Web Technologies & HTTP",
    "points": 100,
    "overview": "Understand how browsers send HTTP requests and receive responses. Focus on methods, status codes, and headers. Focus on core definitions today.",
    "reading": [
      "Search: 'HTTP request response example raw'.",
      "Read about common HTTP methods: GET, POST, PUT, DELETE."
    ],
    "vm_tasks": [
      "curl -v https://httpbin.org/get",
      "curl -X POST https://httpbin.org/post -d 'user=aravind&pass=test'",
      "nc -lvp 8081   # in one terminal, then connect from another using nc 127.0.0.1 8081"
    ],
    "code_snippet": "from http.server import HTTPServer, BaseHTTPRequestHandler\n\nclass SimpleHandler(BaseHTTPRequestHandler):\n    def do_GET(self):\n        self.send_response(200)\n        self.send_header(\"Content-type\", \"text/plain\")\n        self.end_headers()\n        self.wfile.write(b\"Hello from your tiny Python HTTP server!\")\n\nHTTPServer((\"0.0.0.0\", 9000), SimpleHandler).serve_forever()\n"
  },
  {
    "day": 12,
    "title": "Day 12: Web Technologies & HTTP",
    "topic": "Web Technologies & HTTP",
    "points": 100,
    "overview": "Understand how browsers send HTTP requests and receive responses. Focus on methods, status codes, and headers. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'HTTP request response example raw'.",
      "Read about common HTTP methods: GET, POST, PUT, DELETE."
    ],
    "vm_tasks": [
      "curl -v https://httpbin.org/get",
      "curl -X POST https://httpbin.org/post -d 'user=aravind&pass=test'",
      "nc -lvp 8081   # in one terminal, then connect from another using nc 127.0.0.1 8081"
    ],
    "code_snippet": "from http.server import HTTPServer, BaseHTTPRequestHandler\n\nclass SimpleHandler(BaseHTTPRequestHandler):\n    def do_GET(self):\n        self.send_response(200)\n        self.send_header(\"Content-type\", \"text/plain\")\n        self.end_headers()\n        self.wfile.write(b\"Hello from your tiny Python HTTP server!\")\n\nHTTPServer((\"0.0.0.0\", 9000), SimpleHandler).serve_forever()\n"
  },
  {
    "day": 13,
    "title": "Day 13: Setting Up Lab Environment",
    "topic": "Setting Up Lab Environment",
    "points": 100,
    "overview": "Build your own safe playground: hypervisor, Kali VM, vulnerable target VMs, isolated networking. Focus on core definitions today.",
    "reading": [
      "Search: 'How to install Kali Linux in VirtualBox (step by step)'.",
      "Read a basic guide to Metasploitable2 or DVWA setup."
    ],
    "vm_tasks": [
      "Create Kali VM (2\u20134 GB RAM, 30 GB disk).",
      "Create a target VM (Metasploitable2 / DVWA).",
      "Configure Host-Only or Internal Network in VirtualBox."
    ],
    "code_snippet": "# Create a lab_layout.txt file documenting your VM names and IPs.\nwith open(\"lab_layout.txt\",\"w\") as f:\n    f.write(\"Kali: 192.168.56.10\\nTarget: 192.168.56.101\\nNetwork: host-only\\n\")\nprint(\"Wrote lab_layout.txt\")\n"
  },
  {
    "day": 14,
    "title": "Day 14: Setting Up Lab Environment",
    "topic": "Setting Up Lab Environment",
    "points": 100,
    "overview": "Build your own safe playground: hypervisor, Kali VM, vulnerable target VMs, isolated networking. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'How to install Kali Linux in VirtualBox (step by step)'.",
      "Read a basic guide to Metasploitable2 or DVWA setup."
    ],
    "vm_tasks": [
      "Create Kali VM (2\u20134 GB RAM, 30 GB disk).",
      "Create a target VM (Metasploitable2 / DVWA).",
      "Configure Host-Only or Internal Network in VirtualBox."
    ],
    "code_snippet": "# Create a lab_layout.txt file documenting your VM names and IPs.\nwith open(\"lab_layout.txt\",\"w\") as f:\n    f.write(\"Kali: 192.168.56.10\\nTarget: 192.168.56.101\\nNetwork: host-only\\n\")\nprint(\"Wrote lab_layout.txt\")\n"
  },
  {
    "day": 15,
    "title": "Day 15: Intro to Ethical Cybersecurity",
    "topic": "Intro to Ethical Cybersecurity",
    "points": 100,
    "overview": "Learn about the CIA triad, legal boundaries, and how professional ethical hackers operate. Focus on core definitions today.",
    "reading": [
      "Search: 'CIA triad confidentiality integrity availability'.",
      "Look at a sample responsible disclosure policy from a bug bounty platform."
    ],
    "vm_tasks": [
      "Create a document in your VM: 'MY_ETHICAL_RULES.md'.",
      "Write at least 5 rules you promise to follow as an ethical hacker."
    ],
    "code_snippet": "rules = [\n    \"Only test systems I own or have written permission to test.\",\n    \"Avoid harming availability or integrity of real systems.\",\n    \"Report vulnerabilities responsibly.\",\n]\nopen(\"MY_ETHICAL_RULES.txt\",\"w\").write(\"\\n\".join(rules))\nprint(\"Ethical rules saved.\")\n"
  },
  {
    "day": 16,
    "title": "Day 16: Intro to Ethical Cybersecurity",
    "topic": "Intro to Ethical Cybersecurity",
    "points": 100,
    "overview": "Learn about the CIA triad, legal boundaries, and how professional ethical hackers operate. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'CIA triad confidentiality integrity availability'.",
      "Look at a sample responsible disclosure policy from a bug bounty platform."
    ],
    "vm_tasks": [
      "Create a document in your VM: 'MY_ETHICAL_RULES.md'.",
      "Write at least 5 rules you promise to follow as an ethical hacker."
    ],
    "code_snippet": "rules = [\n    \"Only test systems I own or have written permission to test.\",\n    \"Avoid harming availability or integrity of real systems.\",\n    \"Report vulnerabilities responsibly.\",\n]\nopen(\"MY_ETHICAL_RULES.txt\",\"w\").write(\"\\n\".join(rules))\nprint(\"Ethical rules saved.\")\n"
  },
  {
    "day": 17,
    "title": "Day 17: Information Gathering",
    "topic": "Information Gathering",
    "points": 100,
    "overview": "Passive recon: discovering data without touching the target directly (or very lightly). Focus on core definitions today.",
    "reading": [
      "Read about OSINT (Open Source Intelligence).",
      "Search: 'whois, nslookup, dig basics'."
    ],
    "vm_tasks": [
      "whois example.com",
      "dig example.com",
      "host example.com"
    ],
    "code_snippet": "import subprocess\nfor cmd in [[\"whois\",\"example.com\"],[\"dig\",\"example.com\",\"+short\"]]:\n    print(\"\\n$\", \" \".join(cmd))\n    print(subprocess.getoutput(\" \".join(cmd)))\n"
  },
  {
    "day": 18,
    "title": "Day 18: Information Gathering",
    "topic": "Information Gathering",
    "points": 100,
    "overview": "Passive recon: discovering data without touching the target directly (or very lightly). Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Read about OSINT (Open Source Intelligence).",
      "Search: 'whois, nslookup, dig basics'."
    ],
    "vm_tasks": [
      "whois example.com",
      "dig example.com",
      "host example.com"
    ],
    "code_snippet": "import subprocess\nfor cmd in [[\"whois\",\"example.com\"],[\"dig\",\"example.com\",\"+short\"]]:\n    print(\"\\n$\", \" \".join(cmd))\n    print(subprocess.getoutput(\" \".join(cmd)))\n"
  },
  {
    "day": 19,
    "title": "Day 19: Network Scanning",
    "topic": "Network Scanning",
    "points": 100,
    "overview": "Active probing of hosts and ports using tools like nmap to map out services. Focus on core definitions today.",
    "reading": [
      "Search: 'nmap tutorial for beginners'.",
      "Understand scan types: -sS, -sV, -O, -A."
    ],
    "vm_tasks": [
      "nmap -sn 192.168.56.0/24",
      "nmap -sV 192.168.56.101",
      "nmap -p- 192.168.56.101 --min-rate 1000"
    ],
    "code_snippet": "import subprocess, re\nip = \"192.168.56.101\"\nout = subprocess.getoutput(f\"nmap -sV {ip}\")\nfor line in out.splitlines():\n    if re.match(r\"^\\d+/tcp\", line):\n        print(line)\n"
  },
  {
    "day": 20,
    "title": "Day 20: Network Scanning",
    "topic": "Network Scanning",
    "points": 100,
    "overview": "Active probing of hosts and ports using tools like nmap to map out services. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'nmap tutorial for beginners'.",
      "Understand scan types: -sS, -sV, -O, -A."
    ],
    "vm_tasks": [
      "nmap -sn 192.168.56.0/24",
      "nmap -sV 192.168.56.101",
      "nmap -p- 192.168.56.101 --min-rate 1000"
    ],
    "code_snippet": "import subprocess, re\nip = \"192.168.56.101\"\nout = subprocess.getoutput(f\"nmap -sV {ip}\")\nfor line in out.splitlines():\n    if re.match(r\"^\\d+/tcp\", line):\n        print(line)\n"
  },
  {
    "day": 21,
    "title": "Day 21: Social Engineering Awareness",
    "topic": "Social Engineering Awareness",
    "points": 100,
    "overview": "Understand how attackers manipulate humans instead of technology: phishing, pretexting, baiting. Focus on core definitions today.",
    "reading": [
      "Search: 'real world phishing attack examples'.",
      "Read about security awareness best practices."
    ],
    "vm_tasks": [
      "Write a fake-but-safe phishing email in a text file. Do NOT send it.",
      "List red flags you would teach a non-technical friend to detect."
    ],
    "code_snippet": "template = (\n    \"Subject: Important: Account Verification Required\\n\\n\"\n    \"Dear User,\\n\\n\"\n    \"We noticed unusual activity... (THIS IS A TRAINING EXAMPLE, DO NOT SEND)\\n\"\n)\nopen(\"fake_phish.txt\",\"w\").write(template)\nprint(\"Created fake_phish.txt for training only.\")\n"
  },
  {
    "day": 22,
    "title": "Day 22: Social Engineering Awareness",
    "topic": "Social Engineering Awareness",
    "points": 100,
    "overview": "Understand how attackers manipulate humans instead of technology: phishing, pretexting, baiting. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'real world phishing attack examples'.",
      "Read about security awareness best practices."
    ],
    "vm_tasks": [
      "Write a fake-but-safe phishing email in a text file. Do NOT send it.",
      "List red flags you would teach a non-technical friend to detect."
    ],
    "code_snippet": "template = (\n    \"Subject: Important: Account Verification Required\\n\\n\"\n    \"Dear User,\\n\\n\"\n    \"We noticed unusual activity... (THIS IS A TRAINING EXAMPLE, DO NOT SEND)\\n\"\n)\nopen(\"fake_phish.txt\",\"w\").write(template)\nprint(\"Created fake_phish.txt for training only.\")\n"
  },
  {
    "day": 23,
    "title": "Day 23: Network Monitoring & Packet Analysis",
    "topic": "Network Monitoring & Packet Analysis",
    "points": 100,
    "overview": "Use Wireshark/tcpdump to see raw packets, TCP handshakes, DNS queries, HTTP requests. Focus on core definitions today.",
    "reading": [
      "Search: 'Wireshark basic filters icmp http dns'.",
      "Learn how to follow a TCP stream in Wireshark."
    ],
    "vm_tasks": [
      "tcpdump -i eth0 icmp -c 5",
      "Start Wireshark, capture, then ping your target VM.",
      "Apply filter: http or dns and analyze fields."
    ],
    "code_snippet": "from scapy.all import sniff\nprint(\"Sniffing 5 ICMP packets...\")\npkts = sniff(filter=\"icmp\", count=5)\nfor p in pkts:\n    print(p.summary())\n"
  },
  {
    "day": 24,
    "title": "Day 24: Network Monitoring & Packet Analysis",
    "topic": "Network Monitoring & Packet Analysis",
    "points": 100,
    "overview": "Use Wireshark/tcpdump to see raw packets, TCP handshakes, DNS queries, HTTP requests. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'Wireshark basic filters icmp http dns'.",
      "Learn how to follow a TCP stream in Wireshark."
    ],
    "vm_tasks": [
      "tcpdump -i eth0 icmp -c 5",
      "Start Wireshark, capture, then ping your target VM.",
      "Apply filter: http or dns and analyze fields."
    ],
    "code_snippet": "from scapy.all import sniff\nprint(\"Sniffing 5 ICMP packets...\")\npkts = sniff(filter=\"icmp\", count=5)\nfor p in pkts:\n    print(p.summary())\n"
  },
  {
    "day": 25,
    "title": "Day 25: Malware Concepts & Prevention",
    "topic": "Malware Concepts & Prevention",
    "points": 100,
    "overview": "High-level view of malware types: virus, worm, trojan, ransomware, keylogger. Focus on defenses. Focus on core definitions today.",
    "reading": [
      "Search: 'types of malware explained'.",
      "Read basics of antivirus and endpoint protection."
    ],
    "vm_tasks": [
      "Practice using 'strings' and 'file' on harmless binaries.",
      "Design a folder structure for analysis lab (but no real malware)."
    ],
    "code_snippet": "import os, time\nfor i in range(3):\n    name = f\"log_sim_{i}.txt\"\n    open(name,\"w\").write(\"test log\")\n    print(\"Created\", name)\n    time.sleep(1)\n"
  },
  {
    "day": 26,
    "title": "Day 26: Malware Concepts & Prevention",
    "topic": "Malware Concepts & Prevention",
    "points": 100,
    "overview": "High-level view of malware types: virus, worm, trojan, ransomware, keylogger. Focus on defenses. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'types of malware explained'.",
      "Read basics of antivirus and endpoint protection."
    ],
    "vm_tasks": [
      "Practice using 'strings' and 'file' on harmless binaries.",
      "Design a folder structure for analysis lab (but no real malware)."
    ],
    "code_snippet": "import os, time\nfor i in range(3):\n    name = f\"log_sim_{i}.txt\"\n    open(name,\"w\").write(\"test log\")\n    print(\"Created\", name)\n    time.sleep(1)\n"
  },
  {
    "day": 27,
    "title": "Day 27: System Security Testing",
    "topic": "System Security Testing",
    "points": 100,
    "overview": "Checking for weak passwords, default credentials, outdated software and exposed services. Focus on core definitions today.",
    "reading": [
      "Search: 'system hardening checklist Linux'.",
      "Read about password policies and lockout rules."
    ],
    "vm_tasks": [
      "Check /etc/passwd and /etc/shadow permissions.",
      "Try logging into DVWA or test app with default creds: admin/admin (lab only)."
    ],
    "code_snippet": "import subprocess\nprint(subprocess.getoutput(\"grep ':/bin/bash' /etc/passwd\"))\n"
  },
  {
    "day": 28,
    "title": "Day 28: System Security Testing",
    "topic": "System Security Testing",
    "points": 100,
    "overview": "Checking for weak passwords, default credentials, outdated software and exposed services. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'system hardening checklist Linux'.",
      "Read about password policies and lockout rules."
    ],
    "vm_tasks": [
      "Check /etc/passwd and /etc/shadow permissions.",
      "Try logging into DVWA or test app with default creds: admin/admin (lab only)."
    ],
    "code_snippet": "import subprocess\nprint(subprocess.getoutput(\"grep ':/bin/bash' /etc/passwd\"))\n"
  },
  {
    "day": 29,
    "title": "Day 29: Vulnerability Assessment Tools",
    "topic": "Vulnerability Assessment Tools",
    "points": 100,
    "overview": "Automatically scan systems for known vulnerabilities using tools like OpenVAS or lighter CLI tools. Focus on core definitions today.",
    "reading": [
      "Search: 'what is vulnerability assessment vs penetration testing'.",
      "Look at screenshots of OpenVAS scans for context."
    ],
    "vm_tasks": [
      "Run `nikto -h http://TARGET_IP` against DVWA/Juice Shop.",
      "Experiment with `nmap --script vuln TARGET_IP`."
    ],
    "code_snippet": "import subprocess\nip = \"192.168.56.101\"\nprint(subprocess.getoutput(f\"nmap --script vuln {ip} | head\"))\n"
  },
  {
    "day": 30,
    "title": "Day 30: Vulnerability Assessment Tools",
    "topic": "Vulnerability Assessment Tools",
    "points": 100,
    "overview": "Automatically scan systems for known vulnerabilities using tools like OpenVAS or lighter CLI tools. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'what is vulnerability assessment vs penetration testing'.",
      "Look at screenshots of OpenVAS scans for context."
    ],
    "vm_tasks": [
      "Run `nikto -h http://TARGET_IP` against DVWA/Juice Shop.",
      "Experiment with `nmap --script vuln TARGET_IP`."
    ],
    "code_snippet": "import subprocess\nip = \"192.168.56.101\"\nprint(subprocess.getoutput(f\"nmap --script vuln {ip} | head\"))\n"
  },
  {
    "day": 31,
    "title": "Day 31: Enumeration Techniques",
    "topic": "Enumeration Techniques",
    "points": 100,
    "overview": "After initial scans, dig deeper into services to uncover users, shares, versions. Focus on core definitions today.",
    "reading": [
      "Search: 'SMB enumeration enum4linux guide'.",
      "Read about SNMP, SMB, FTP enumeration concepts."
    ],
    "vm_tasks": [
      "enum4linux -a 192.168.56.101   # if Samba service exists",
      "nmap -sU --top-ports 50 192.168.56.101"
    ],
    "code_snippet": "import socket\nhost = \"192.168.56.101\"\nport = 21\ns = socket.socket()\ns.settimeout(3)\ntry:\n    s.connect((host, port))\n    banner = s.recv(1024).decode(errors=\"ignore\")\n    print(\"Banner:\", banner)\nfinally:\n    s.close()\n"
  },
  {
    "day": 32,
    "title": "Day 32: Enumeration Techniques",
    "topic": "Enumeration Techniques",
    "points": 100,
    "overview": "After initial scans, dig deeper into services to uncover users, shares, versions. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'SMB enumeration enum4linux guide'.",
      "Read about SNMP, SMB, FTP enumeration concepts."
    ],
    "vm_tasks": [
      "enum4linux -a 192.168.56.101   # if Samba service exists",
      "nmap -sU --top-ports 50 192.168.56.101"
    ],
    "code_snippet": "import socket\nhost = \"192.168.56.101\"\nport = 21\ns = socket.socket()\ns.settimeout(3)\ntry:\n    s.connect((host, port))\n    banner = s.recv(1024).decode(errors=\"ignore\")\n    print(\"Banner:\", banner)\nfinally:\n    s.close()\n"
  },
  {
    "day": 33,
    "title": "Day 33: Service Disruption Testing (DoS in Lab)",
    "topic": "Service Disruption Testing (DoS in Lab)",
    "points": 100,
    "overview": "Understand the concept of DoS/DDoS, but never test outside your isolated lab. Focus on core definitions today.",
    "reading": [
      "Search: 'what is a denial of service attack' (conceptual).",
      "Read about rate limiting, WAFs, and throttling defenses."
    ],
    "vm_tasks": [
      "Run a small HTTP server on target, then use 'ab' or 'siege' with VERY low rate from Kali.",
      "Monitor CPU/network usage to see stress."
    ],
    "code_snippet": "import requests, time\nurl = \"http://192.168.56.101/\"\nfor i in range(10):\n    try:\n        r = requests.get(url, timeout=2)\n        print(i, r.status_code)\n    except Exception as e:\n        print(\"error\", e)\n    time.sleep(0.5)\n"
  },
  {
    "day": 34,
    "title": "Day 34: Service Disruption Testing (DoS in Lab)",
    "topic": "Service Disruption Testing (DoS in Lab)",
    "points": 100,
    "overview": "Understand the concept of DoS/DDoS, but never test outside your isolated lab. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'what is a denial of service attack' (conceptual).",
      "Read about rate limiting, WAFs, and throttling defenses."
    ],
    "vm_tasks": [
      "Run a small HTTP server on target, then use 'ab' or 'siege' with VERY low rate from Kali.",
      "Monitor CPU/network usage to see stress."
    ],
    "code_snippet": "import requests, time\nurl = \"http://192.168.56.101/\"\nfor i in range(10):\n    try:\n        r = requests.get(url, timeout=2)\n        print(i, r.status_code)\n    except Exception as e:\n        print(\"error\", e)\n    time.sleep(0.5)\n"
  },
  {
    "day": 35,
    "title": "Day 35: Session Security & Spoofing (Lab)",
    "topic": "Session Security & Spoofing (Lab)",
    "points": 100,
    "overview": "How cookies and session IDs authenticate users; why insecure session management leads to hijacking. Focus on core definitions today.",
    "reading": [
      "Search: 'session fixation and session hijacking explained'.",
      "Read about secure cookie flags: HttpOnly, Secure."
    ],
    "vm_tasks": [
      "Log into DVWA, intercept request with Burp.",
      "Observe session cookie value changing on login/logout."
    ],
    "code_snippet": "import requests\ns = requests.Session()\nprint(\"Initial cookies:\", s.cookies.get_dict())\n"
  },
  {
    "day": 36,
    "title": "Day 36: Session Security & Spoofing (Lab)",
    "topic": "Session Security & Spoofing (Lab)",
    "points": 100,
    "overview": "How cookies and session IDs authenticate users; why insecure session management leads to hijacking. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'session fixation and session hijacking explained'.",
      "Read about secure cookie flags: HttpOnly, Secure."
    ],
    "vm_tasks": [
      "Log into DVWA, intercept request with Burp.",
      "Observe session cookie value changing on login/logout."
    ],
    "code_snippet": "import requests\ns = requests.Session()\nprint(\"Initial cookies:\", s.cookies.get_dict())\n"
  },
  {
    "day": 37,
    "title": "Day 37: Web App Testing",
    "topic": "Web App Testing",
    "points": 100,
    "overview": "Practice core web vulns: XSS, SQL injection, file inclusion, insecure direct object references. Focus on core definitions today.",
    "reading": [
      "Search: 'OWASP Top 10 overview'.",
      "Read DVWA docs for each vulnerability module."
    ],
    "vm_tasks": [
      "Launch DVWA in low-security mode.",
      "Try reflected XSS payload: <script>alert(1)</script> in allowed field.",
      "Try simple SQL injection: ' OR '1'='1 in login (lab only)."
    ],
    "code_snippet": "import requests\nurl = \"http://192.168.56.101/dvwa/vulnerabilities/xss_r/\"\npayload = \"<script>alert('xss')</script>\"\nparams = {\"name\": payload, \"submit\": \"Submit\"}\nr = requests.get(url, params=params)\nprint(\"Status code:\", r.status_code)\n"
  },
  {
    "day": 38,
    "title": "Day 38: Web App Testing",
    "topic": "Web App Testing",
    "points": 100,
    "overview": "Practice core web vulns: XSS, SQL injection, file inclusion, insecure direct object references. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'OWASP Top 10 overview'.",
      "Read DVWA docs for each vulnerability module."
    ],
    "vm_tasks": [
      "Launch DVWA in low-security mode.",
      "Try reflected XSS payload: <script>alert(1)</script> in allowed field.",
      "Try simple SQL injection: ' OR '1'='1 in login (lab only)."
    ],
    "code_snippet": "import requests\nurl = \"http://192.168.56.101/dvwa/vulnerabilities/xss_r/\"\npayload = \"<script>alert('xss')</script>\"\nparams = {\"name\": payload, \"submit\": \"Submit\"}\nr = requests.get(url, params=params)\nprint(\"Status code:\", r.status_code)\n"
  },
  {
    "day": 39,
    "title": "Day 39: Wireless Network Security (Lab only)",
    "topic": "Wireless Network Security (Lab only)",
    "points": 100,
    "overview": "Understand Wi-Fi standards, WPA2/WPA3, handshake capture, and why strong passphrases matter. Focus on core definitions today.",
    "reading": [
      "Search: 'WPA2 four-way handshake explained'.",
      "Read about common Wi-Fi attack vectors like evil twin AP."
    ],
    "vm_tasks": [
      "Use 'iwconfig' to inspect your wireless interface (if supported in VM).",
      "Only capture traffic on your own access point if legal."
    ],
    "code_snippet": "open(\"wifi_notes.txt\",\"w\").write(\"Today I studied WPA2 and legal boundaries for Wi-Fi testing.\\n\")\nprint(\"wifi_notes.txt written.\")\n"
  },
  {
    "day": 40,
    "title": "Day 40: Wireless Network Security (Lab only)",
    "topic": "Wireless Network Security (Lab only)",
    "points": 100,
    "overview": "Understand Wi-Fi standards, WPA2/WPA3, handshake capture, and why strong passphrases matter. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'WPA2 four-way handshake explained'.",
      "Read about common Wi-Fi attack vectors like evil twin AP."
    ],
    "vm_tasks": [
      "Use 'iwconfig' to inspect your wireless interface (if supported in VM).",
      "Only capture traffic on your own access point if legal."
    ],
    "code_snippet": "open(\"wifi_notes.txt\",\"w\").write(\"Today I studied WPA2 and legal boundaries for Wi-Fi testing.\\n\")\nprint(\"wifi_notes.txt written.\")\n"
  },
  {
    "day": 41,
    "title": "Day 41: Intrusion Detection Systems Basics",
    "topic": "Intrusion Detection Systems Basics",
    "points": 100,
    "overview": "Learn how IDS/IPS monitor traffic and trigger alerts against signatures or anomalies. Focus on core definitions today.",
    "reading": [
      "Search: 'Snort simple rule example'.",
      "Read about network-based vs host-based IDS."
    ],
    "vm_tasks": [
      "Install Snort or Suricata in Kali (if hardware allows).",
      "Run with a simple ping detection rule."
    ],
    "code_snippet": "rule = 'alert icmp any any -> any any (msg:\"ICMP test\"; sid:1000001; rev:1;)'\nopen(\"snort_local.rules\",\"w\").write(rule)\nprint(\"Example Snort rule saved to snort_local.rules\")\n"
  },
  {
    "day": 42,
    "title": "Day 42: Intrusion Detection Systems Basics",
    "topic": "Intrusion Detection Systems Basics",
    "points": 100,
    "overview": "Learn how IDS/IPS monitor traffic and trigger alerts against signatures or anomalies. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'Snort simple rule example'.",
      "Read about network-based vs host-based IDS."
    ],
    "vm_tasks": [
      "Install Snort or Suricata in Kali (if hardware allows).",
      "Run with a simple ping detection rule."
    ],
    "code_snippet": "rule = 'alert icmp any any -> any any (msg:\"ICMP test\"; sid:1000001; rev:1;)'\nopen(\"snort_local.rules\",\"w\").write(rule)\nprint(\"Example Snort rule saved to snort_local.rules\")\n"
  },
  {
    "day": 43,
    "title": "Day 43: Cryptography Basics",
    "topic": "Cryptography Basics",
    "points": 100,
    "overview": "Core building blocks: symmetric/asymmetric encryption, hashing, digital signatures. Focus on core definitions today.",
    "reading": [
      "Search: 'difference between hashing and encryption'.",
      "Read about AES and RSA in simple terms."
    ],
    "vm_tasks": [
      "echo 'secret' > secret.txt",
      "openssl enc -aes-256-cbc -salt -in secret.txt -out secret.txt.enc",
      "openssl dgst -sha256 secret.txt"
    ],
    "code_snippet": "import hashlib\nmsg = b\"cybersecurity\"\nprint(\"SHA-256:\", hashlib.sha256(msg).hexdigest())\n"
  },
  {
    "day": 44,
    "title": "Day 44: Cryptography Basics",
    "topic": "Cryptography Basics",
    "points": 100,
    "overview": "Core building blocks: symmetric/asymmetric encryption, hashing, digital signatures. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'difference between hashing and encryption'.",
      "Read about AES and RSA in simple terms."
    ],
    "vm_tasks": [
      "echo 'secret' > secret.txt",
      "openssl enc -aes-256-cbc -salt -in secret.txt -out secret.txt.enc",
      "openssl dgst -sha256 secret.txt"
    ],
    "code_snippet": "import hashlib\nmsg = b\"cybersecurity\"\nprint(\"SHA-256:\", hashlib.sha256(msg).hexdigest())\n"
  },
  {
    "day": 45,
    "title": "Day 45: Exploitation Tools (Metasploit Basics)",
    "topic": "Exploitation Tools (Metasploit Basics)",
    "points": 100,
    "overview": "Use Metasploit responsibly to exploit known vulnerable services in your own lab VMs. Focus on core definitions today.",
    "reading": [
      "Search: 'Metasploitable2 metasploit tutorial'.",
      "Read about exploit, payload, and session in Metasploit."
    ],
    "vm_tasks": [
      "Start msfconsole.",
      "Search for vsftpd or similar exploit for Metasploitable2.",
      "Run the exploit and get a shell (lab only)."
    ],
    "code_snippet": "notes = \"Document the module name, target IP, payload used, and outcome.\"\nopen(\"metasploit_notes.txt\",\"w\").write(notes)\nprint(\"metasploit_notes.txt created.\")\n"
  },
  {
    "day": 46,
    "title": "Day 46: Exploitation Tools (Metasploit Basics)",
    "topic": "Exploitation Tools (Metasploit Basics)",
    "points": 100,
    "overview": "Use Metasploit responsibly to exploit known vulnerable services in your own lab VMs. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'Metasploitable2 metasploit tutorial'.",
      "Read about exploit, payload, and session in Metasploit."
    ],
    "vm_tasks": [
      "Start msfconsole.",
      "Search for vsftpd or similar exploit for Metasploitable2.",
      "Run the exploit and get a shell (lab only)."
    ],
    "code_snippet": "notes = \"Document the module name, target IP, payload used, and outcome.\"\nopen(\"metasploit_notes.txt\",\"w\").write(notes)\nprint(\"metasploit_notes.txt created.\")\n"
  },
  {
    "day": 47,
    "title": "Day 47: Reverse Engineering Introduction",
    "topic": "Reverse Engineering Introduction",
    "points": 100,
    "overview": "Peek inside compiled binaries using tools like strings, objdump, ltrace, gdb. Focus on core definitions today.",
    "reading": [
      "Search: 'basic reverse engineering for beginners linux'.",
      "Read about ELF file structure."
    ],
    "vm_tasks": [
      "Write a simple C program and compile with gcc.",
      "Use 'strings', 'file', and 'objdump -d' on the binary."
    ],
    "code_snippet": "c_code = \"#include <stdio.h>\\nint main(){printf(\\\"Hello RE\\\\n\\\");return 0;}\\n\"\nopen(\"re_hello.c\",\"w\").write(c_code)\nprint(\"Created re_hello.c; compile with: gcc re_hello.c -o re_hello\")\n"
  },
  {
    "day": 48,
    "title": "Day 48: Reverse Engineering Introduction",
    "topic": "Reverse Engineering Introduction",
    "points": 100,
    "overview": "Peek inside compiled binaries using tools like strings, objdump, ltrace, gdb. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'basic reverse engineering for beginners linux'.",
      "Read about ELF file structure."
    ],
    "vm_tasks": [
      "Write a simple C program and compile with gcc.",
      "Use 'strings', 'file', and 'objdump -d' on the binary."
    ],
    "code_snippet": "c_code = \"#include <stdio.h>\\nint main(){printf(\\\"Hello RE\\\\n\\\");return 0;}\\n\"\nopen(\"re_hello.c\",\"w\").write(c_code)\nprint(\"Created re_hello.c; compile with: gcc re_hello.c -o re_hello\")\n"
  },
  {
    "day": 49,
    "title": "Day 49: Malware Analysis Basics",
    "topic": "Malware Analysis Basics",
    "points": 100,
    "overview": "Understand static vs dynamic analysis, but only on safe samples or educational ones. Focus on core definitions today.",
    "reading": [
      "Search: 'static vs dynamic malware analysis difference'.",
      "Read about sandboxing and why it helps."
    ],
    "vm_tasks": [
      "Take a benign binary and practice classifying imports with 'objdump -x'.",
      "Never download real malware unless in a professional supervised lab."
    ],
    "code_snippet": "import subprocess\nbinary = \"/bin/ls\"\nprint(subprocess.getoutput(f\"strings {binary} | head\"))\n"
  },
  {
    "day": 50,
    "title": "Day 50: Malware Analysis Basics",
    "topic": "Malware Analysis Basics",
    "points": 100,
    "overview": "Understand static vs dynamic analysis, but only on safe samples or educational ones. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'static vs dynamic malware analysis difference'.",
      "Read about sandboxing and why it helps."
    ],
    "vm_tasks": [
      "Take a benign binary and practice classifying imports with 'objdump -x'.",
      "Never download real malware unless in a professional supervised lab."
    ],
    "code_snippet": "import subprocess\nbinary = \"/bin/ls\"\nprint(subprocess.getoutput(f\"strings {binary} | head\"))\n"
  },
  {
    "day": 51,
    "title": "Day 51: Capture The Flag Practice",
    "topic": "Capture The Flag Practice",
    "points": 100,
    "overview": "Apply your skills in puzzle-like challenges. Focus on web, crypto, and forensics beginner problems. Focus on core definitions today.",
    "reading": [
      "Search: 'PicoCTF beginners guide'.",
      "Read writeups for 1\u20132 very easy CTF challenges."
    ],
    "vm_tasks": [
      "Download an offline CTF challenge (if possible) and solve at least one.",
      "Use the tools you learned: nmap, curl, Python scripts."
    ],
    "code_snippet": "flag_example = \"picoCTF{EXAMPLE_FLAG}\"\nprint(\"Never share real flags publicly. Store them securely for submission only.\")\n"
  },
  {
    "day": 52,
    "title": "Day 52: Capture The Flag Practice",
    "topic": "Capture The Flag Practice",
    "points": 100,
    "overview": "Apply your skills in puzzle-like challenges. Focus on web, crypto, and forensics beginner problems. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'PicoCTF beginners guide'.",
      "Read writeups for 1\u20132 very easy CTF challenges."
    ],
    "vm_tasks": [
      "Download an offline CTF challenge (if possible) and solve at least one.",
      "Use the tools you learned: nmap, curl, Python scripts."
    ],
    "code_snippet": "flag_example = \"picoCTF{EXAMPLE_FLAG}\"\nprint(\"Never share real flags publicly. Store them securely for submission only.\")\n"
  },
  {
    "day": 53,
    "title": "Day 53: Vulnerability Disclosure & Bug Bounty Basics",
    "topic": "Vulnerability Disclosure & Bug Bounty Basics",
    "points": 100,
    "overview": "Learn how to responsibly disclose findings and how bug bounty platforms operate. Focus on core definitions today.",
    "reading": [
      "Search: 'how to write a good vulnerability report'.",
      "Read the rules of one public bug bounty program."
    ],
    "vm_tasks": [
      "Write a sample report for a fake SQLi in DVWA.",
      "Describe impact, steps to reproduce, and mitigation."
    ],
    "code_snippet": "report = (\n    \"Title: SQL Injection in test parameter (LAB ONLY)\\n\"\n    \"Impact: Extracts sensitive data from demo DB.\\n\"\n    \"Steps: 1) ... 2) ...\\n\"\n    \"Mitigation: Use prepared statements.\\n\"\n)\nopen(\"sample_report.txt\",\"w\").write(report)\nprint(\"sample_report.txt created.\")\n"
  },
  {
    "day": 54,
    "title": "Day 54: Vulnerability Disclosure & Bug Bounty Basics",
    "topic": "Vulnerability Disclosure & Bug Bounty Basics",
    "points": 100,
    "overview": "Learn how to responsibly disclose findings and how bug bounty platforms operate. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'how to write a good vulnerability report'.",
      "Read the rules of one public bug bounty program."
    ],
    "vm_tasks": [
      "Write a sample report for a fake SQLi in DVWA.",
      "Describe impact, steps to reproduce, and mitigation."
    ],
    "code_snippet": "report = (\n    \"Title: SQL Injection in test parameter (LAB ONLY)\\n\"\n    \"Impact: Extracts sensitive data from demo DB.\\n\"\n    \"Steps: 1) ... 2) ...\\n\"\n    \"Mitigation: Use prepared statements.\\n\"\n)\nopen(\"sample_report.txt\",\"w\").write(report)\nprint(\"sample_report.txt created.\")\n"
  },
  {
    "day": 55,
    "title": "Day 55: Red Team Skills & Simulation Basics",
    "topic": "Red Team Skills & Simulation Basics",
    "points": 100,
    "overview": "Think like an attacker end-to-end: recon -> exploit -> post-exploit, but in a controlled lab. Focus on core definitions today.",
    "reading": [
      "Search: 'cyber kill chain stages'.",
      "Read about purple teaming (red + blue collaboration)."
    ],
    "vm_tasks": [
      "Plan a 3-step scenario against your lab: recon, exploit, post-exploit.",
      "Execute it and take notes/screenshots."
    ],
    "code_snippet": "plan = [\n    \"Step 1: nmap scan on lab network\",\n    \"Step 2: use Metasploit on vulnerable service\",\n    \"Step 3: post-exploitation info gathering\",\n]\nopen(\"redteam_plan.txt\",\"w\").write(\"\\n\".join(plan))\nprint(\"redteam_plan.txt created.\")\n"
  },
  {
    "day": 56,
    "title": "Day 56: Red Team Skills & Simulation Basics",
    "topic": "Red Team Skills & Simulation Basics",
    "points": 100,
    "overview": "Think like an attacker end-to-end: recon -> exploit -> post-exploit, but in a controlled lab. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'cyber kill chain stages'.",
      "Read about purple teaming (red + blue collaboration)."
    ],
    "vm_tasks": [
      "Plan a 3-step scenario against your lab: recon, exploit, post-exploit.",
      "Execute it and take notes/screenshots."
    ],
    "code_snippet": "plan = [\n    \"Step 1: nmap scan on lab network\",\n    \"Step 2: use Metasploit on vulnerable service\",\n    \"Step 3: post-exploitation info gathering\",\n]\nopen(\"redteam_plan.txt\",\"w\").write(\"\\n\".join(plan))\nprint(\"redteam_plan.txt created.\")\n"
  },
  {
    "day": 57,
    "title": "Day 57: Industry Certifications & Roadmap",
    "topic": "Industry Certifications & Roadmap",
    "points": 100,
    "overview": "Map your skills to certifications and career paths: SOC analyst, penetration tester, security engineer. Focus on core definitions today.",
    "reading": [
      "Search: 'roadmap to become penetration tester'.",
      "Compare CEH, eJPT, OSCP, Security+ content outlines."
    ],
    "vm_tasks": [
      "Create a 6-month learning roadmap text file in your VM.",
      "Define which skills/certs you want and milestones per month."
    ],
    "code_snippet": "roadmap = (\n    \"6-MONTH PLAN\\n\"\n    \"Month 1-2: Strengthen Linux & networking.\\n\"\n    \"Month 3-4: Deep dive web app hacking.\\n\"\n    \"Month 5-6: Pick one cert (eJPT/CEH) and start labs.\\n\"\n)\nopen(\"my_6month_plan.txt\",\"w\").write(roadmap)\nprint(\"my_6month_plan.txt created.\")\n"
  },
  {
    "day": 58,
    "title": "Day 58: Industry Certifications & Roadmap",
    "topic": "Industry Certifications & Roadmap",
    "points": 100,
    "overview": "Map your skills to certifications and career paths: SOC analyst, penetration tester, security engineer. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'roadmap to become penetration tester'.",
      "Compare CEH, eJPT, OSCP, Security+ content outlines."
    ],
    "vm_tasks": [
      "Create a 6-month learning roadmap text file in your VM.",
      "Define which skills/certs you want and milestones per month."
    ],
    "code_snippet": "roadmap = (\n    \"6-MONTH PLAN\\n\"\n    \"Month 1-2: Strengthen Linux & networking.\\n\"\n    \"Month 3-4: Deep dive web app hacking.\\n\"\n    \"Month 5-6: Pick one cert (eJPT/CEH) and start labs.\\n\"\n)\nopen(\"my_6month_plan.txt\",\"w\").write(roadmap)\nprint(\"my_6month_plan.txt created.\")\n"
  },
  {
    "day": 59,
    "title": "Day 59: Computer & Internet Fundamentals",
    "topic": "Computer & Internet Fundamentals",
    "points": 100,
    "overview": "Understand how computers talk over networks: IP addresses, MAC addresses, DNS, and the idea of clients and servers. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Look up: 'What is an IP address' and 'How DNS works' (any beginner blog).",
      "Draw a client\u2013server diagram in your notebook."
    ],
    "vm_tasks": [
      "ip addr",
      "ping 8.8.8.8",
      "nslookup example.com"
    ],
    "code_snippet": "print(\"This week you mainly run shell commands; no big script needed yet.\")"
  },
  {
    "day": 60,
    "title": "Day 60: Networking Essentials",
    "topic": "Networking Essentials",
    "points": 100,
    "overview": "Dive into TCP/UDP, the 3-way handshake, common ports like 80,443,22 and basic routing. Do more hands-on and try to explain the idea in your own words.",
    "reading": [
      "Search: 'TCP vs UDP for beginners'.",
      "Read about the OSI vs TCP/IP models."
    ],
    "vm_tasks": [
      "netstat -tulnp | head",
      "traceroute google.com",
      "ip route"
    ],
    "code_snippet": "import socket\nhost = \"scanme.nmap.org\"\nport = 80\nprint(f\"Testing TCP connection to {host}:{port}\")\ntry:\n    s = socket.create_connection((host, port), timeout=3)\n    print(\"Connected!\")\n    s.close()\nexcept Exception as e:\n    print(\"Connection failed:\", e)\n"
  }
];
