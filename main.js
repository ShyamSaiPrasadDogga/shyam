function sendCommand(command) {
            fetch(`/?direction=${command}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to send command');
                    }
                })
                .catch(error => console.error('Error sending command:', error));
        }

        function setServoAngle() {
            const angle = document.getElementById('angle').value;
            fetch(`/?angle=${angle}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to set servo angle');
                    }
                })
                .catch(error => console.error('Error setting servo angle:', error));
        }
        document.getElementById('forward').addEventListener('click', () => sendCommand('forward'));
        document.getElementById('left').addEventListener('click', () => sendCommand('left'));
        document.getElementById('stop').addEventListener('click', () => sendCommand('stop'));
        document.getElementById('right').addEventListener('click', () => sendCommand('right'));
        document.getElementById('backward').addEventListener('click', () => sendCommand('backward'));
        document.getElementById('setAngle').addEventListener('click', setServoAngle);

        function updateSensorData() {
            fetch('/data')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch sensor data');
                    }
                    return response.json();
                })
                .then(data => {
                    document.getElementById('temperature').textContent = `Temperature: ${data.temperature} °c`;
                    document.getElementById('tds').textContent = `TDS: ${data.tds}`;
                    document.getElementById('ph').textContent = `pH: ${data.ph}`;
                })
                .catch(error => console.error('Error updating sensor data:', error));
        }

        setInterval(updateSensorData, 500);

        function getESP32IPAddress() {
            fetch('/ip')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch ESP32 IP address');
                    }
                    return response.text();
                })
                .then(ipAddress => {
                    document.getElementById('ipAddress').textContent = ipAddress;
                })
                .catch(error => console.error('Error fetching ESP32 IP address:', error));
        }

        getESP32IPAddress();