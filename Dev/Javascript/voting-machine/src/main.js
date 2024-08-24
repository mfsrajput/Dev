document.addEventListener("DOMContentLoaded", function() {
    // Create and style the container
    const container = document.createElement('div');
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.minHeight = '100vh';
    container.style.margin = '0';
    container.style.backgroundColor = '#282c34';
    container.style.color = '#ffffff';
    container.style.padding = '20px';

    // Title
    const title = document.createElement('h1');
    title.textContent = 'Voting Machine';
    title.style.color = '#61dafb';
    container.appendChild(title);

    // Input for adding candidates
    const candidateInput = document.createElement('input');
    candidateInput.type = 'text';
    candidateInput.placeholder = 'Enter candidate name';
    candidateInput.style.marginBottom = '10px';
    candidateInput.style.padding = '10px';
    candidateInput.style.width = '100%';
    candidateInput.style.maxWidth = '300px';
    candidateInput.style.borderRadius = '5px';
    candidateInput.style.border = '1px solid #61dafb';
    candidateInput.style.backgroundColor = '#3b4048';
    candidateInput.style.color = '#ffffff';
    container.appendChild(candidateInput);

    // Button for adding candidates
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Candidate';
    addButton.style.padding = '10px 20px';
    addButton.style.marginBottom = '20px';
    addButton.style.backgroundColor = '#61dafb';
    addButton.style.color = '#282c34';
    addButton.style.border = 'none';
    addButton.style.borderRadius = '5px';
    addButton.style.cursor = 'pointer';
    addButton.style.fontSize = '16px';
    addButton.style.transition = 'background-color 0.3s';
    container.appendChild(addButton);

    // Hover effect for button
    addButton.addEventListener('mouseenter', () => {
        addButton.style.backgroundColor = '#52a3d1';
    });
    addButton.addEventListener('mouseleave', () => {
        addButton.style.backgroundColor = '#61dafb';
    });

    // Options container (for showing candidates after the Add button)
    const optionsContainer = document.createElement('div');
    optionsContainer.style.marginBottom = '20px';
    optionsContainer.style.display = 'flex';
    optionsContainer.style.flexWrap = 'wrap';
    optionsContainer.style.justifyContent = 'center';
    container.appendChild(optionsContainer);

    // Results container
    const resultsContainer = document.createElement('div');
    resultsContainer.style.width = '100%';
    resultsContainer.style.maxWidth = '300px';
    resultsContainer.style.padding = '10px';
    resultsContainer.style.backgroundColor = '#3b4048';
    resultsContainer.style.borderRadius = '10px';
    resultsContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    resultsContainer.style.color = '#ffffff';
    container.appendChild(resultsContainer);

    // Footer with copyright message
    const footer = document.createElement('footer');
    footer.style.marginTop = '20px';
    footer.style.padding = '10px';
    footer.style.width = '100%';
    footer.style.textAlign = 'center';
    footer.style.color = '#aaaaaa';
    footer.style.fontSize = '14px';
    
    // Create text before the bold name
    const textBeforeName = document.createTextNode('© 2024 Developed by ');
    
    // Create a bold element for the name
    const boldName = document.createElement('strong');
    boldName.textContent = 'Muhammad Farhan';
    
    // Create text after the bold name
    const textAfterName = document.createTextNode('. All rights reserved.');
    
    // Append text and bold name to footer
    footer.appendChild(textBeforeName);
    footer.appendChild(boldName);
    footer.appendChild(textAfterName);
    
    // Append the footer to the container
    container.appendChild(footer);
    

    // Append container to the body
    document.body.style.margin = '0';
    document.body.style.display = 'flex';
    document.body.style.flexDirection = 'column';
    document.body.style.alignItems = 'center';
    document.body.style.justifyContent = 'center';
    document.body.style.minHeight = '100vh';
    document.body.style.backgroundColor = '#282c34';
    document.body.appendChild(container);

    // Array to store candidates and their votes
    let candidates = [];

    // Function to update the voting options
    function updateOptions() {
        optionsContainer.innerHTML = ''; // Clear previous options
        candidates.forEach((candidate, index) => {
            const button = document.createElement('button');
            button.textContent = candidate.name;
            button.style.padding = '10px 15px';
            button.style.margin = '5px';
            button.style.fontSize = '16px';
            button.style.borderRadius = '5px';
            button.style.border = '1px solid #61dafb';
            button.style.backgroundColor = '#3b4048';
            button.style.color = '#ffffff';
            button.style.cursor = 'pointer';
            button.style.transition = 'background-color 0.3s';
            
            // Hover effect for vote buttons
            button.addEventListener('mouseenter', () => {
                button.style.backgroundColor = '#4a4f59';
            });
            button.addEventListener('mouseleave', () => {
                button.style.backgroundColor = '#3b4048';
            });

            button.addEventListener('click', () => vote(index));
            optionsContainer.appendChild(button);
        });
    }

    // Function to update the results
    function updateResults() {
        resultsContainer.innerHTML = ''; // Clear previous results
        candidates.forEach(candidate => {
            const resultDiv = document.createElement('div');
            resultDiv.textContent = `${candidate.name}: ${candidate.votes} votes`;
            resultDiv.style.padding = '5px 0';
            resultDiv.style.fontSize = '16px';
            resultsContainer.appendChild(resultDiv);
        });
    }

    // Function to handle voting
    function vote(index) {
        candidates[index].votes++;
        updateResults();
    }

    // Function to add a new candidate
    function addCandidate() {
        const name = candidateInput.value.trim();
        if (name) {
            candidates.push({ name: name, votes: 0 });
            candidateInput.value = ''; // Clear input
            updateOptions();
            updateResults();
        } else {
            alert('Please enter a candidate name.');
        }
    }

    // Add click event listener for add button
    addButton.addEventListener('click', addCandidate);

    // Add keyup event listener for Enter key
    candidateInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            addCandidate();
        }
    });

    // Initial render
    updateOptions();
    updateResults();
});
