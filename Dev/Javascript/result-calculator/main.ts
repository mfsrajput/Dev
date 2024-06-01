function capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function calculateResult(): void {
    const name = (document.getElementById('personName') as HTMLInputElement).value;
    const rollNumber = (document.getElementById('rollNumber') as HTMLInputElement).value;
    const marks = parseInt((document.getElementById('personMarks') as HTMLInputElement).value);

    let grade: string;
    let resultText: string;

    if (marks >= 900) {
        grade = 'A1';
    } else if (marks >= 800) {
        grade = 'A';
    } else if (marks >= 700) {
        grade = 'B';
    } else if (marks >= 600) {
        grade = 'C';
    } else if (marks >= 500) {
        grade = 'D';
    } else {
        grade = 'F';
    }

    const formattedName = capitalizeFirstLetter(name);
    const resultDisplay = document.getElementById('resultDisplay') as HTMLElement;

    if (grade === 'F') {
        resultText = `Sorry, ${formattedName}, you have failed. Your grade is ${grade}.`;
        resultDisplay.className = 'result-message fail';
    } else {
        resultText = `Congratulations, ${formattedName}, you have passed with grade ${grade}.`;
        resultDisplay.className = 'result-message';
    }

    resultDisplay.innerText = resultText;
}
