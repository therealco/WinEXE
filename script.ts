document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('input') as HTMLInputElement;
    const outputElement = document.getElementById('output') as HTMLDivElement;

    inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = inputElement.value;
            executeCommand(command);
            inputElement.value = '';
        }
    });

    function executeCommand(command: string) {
        const outputLine = document.createElement('div');
        outputLine.textContent = `PS C:\\> ${command}`;
        outputElement.appendChild(outputLine);

        fetch('/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command })
        })
        .then(response => response.json())
        .then(data => {
            const resultLine = document.createElement('div');
            resultLine.textContent = data.result;
            outputElement.appendChild(resultLine);
            outputElement.scrollTop = outputElement.scrollHeight;
        });
    }
});
