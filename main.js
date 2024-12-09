document.addEventListener("DOMContentLoaded", () => {
    const app = document.querySelector('#app');

    // Social news Ui page
    const alertContainer = createAlertWindow();
    app.appendChild(alertContainer);

    const linksContainer = document.createElement('ul');
    linksContainer.classList.add('linksContainer');
    linksContainer.innerHTML = `<li><p>No links saved yet.</p></li>`;
    app.appendChild(linksContainer);
    const links = [];


    // Create a link constructor function 
    class Link {
        constructor(title, url, author) {
            this.title = title;
            this.url = url;
            this.author = author;
        }

        defineLink() {
            if (!(this.url.startsWith("http://") || this.url.startsWith("https://"))) {
                return `${this.title} (http://${this.url}). Author: ${this.author}`;
            }
    
            return `${this.title} (${this.url}). Author: ${this.author}`;
        }
    }


    // Functionality for adding a new link
    function addNewLink(title, url, author) {
        const newLink = new Link(title, url, author);
        links.push(newLink);
        return newLink; // optional for creating a new link..
    }


    // CREATE UI component FOR THE ALERT WINDOW
    function createAlertWindow() {
        const optionsList = ['Show links', 'Add a link', 'Remove a link', 'Quit'];

        const container = document.createElement("form");
        container.classList.add('container');

        const ul = document.createElement("ul");
        ul.classList.add('pick-list');

        optionsList.forEach((item, index) => {
            const li = document.createElement("li");
            if (index === optionsList.length - 1) {
                li.textContent = `0 :${item}`;
                ul.appendChild(li);
            } else {
                li.textContent = `${index + 1} :${item}`;
                ul.appendChild(li);
            }
        })

        container.appendChild(ul);

        const input = document.createElement("input");
        input.type = 'string';
        input.name = 'user-pick';

        container.appendChild(input);

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add('btn-container');

        const cancelButton = document.createElement("button");
        cancelButton.classList.add('btn', 'btn-cancel');
        cancelButton.textContent = "Cancel";
        cancelButton.onclick = () => {
            app.removeChild(alertContainer);
        }

        const okButton = document.createElement("button");
        okButton.classList.add('btn', 'btn-ok');
        okButton.textContent = "OK";


        // Adding event handlers for the ok button
        okButton.addEventListener('click', (event) => {
            event.preventDefault();
            const inputValue = input.value.trim();

            if (inputValue === '' || isNaN(Number(inputValue))) {
                alert('Please enter a valid number');
            } else {
                const pick = Number(inputValue);
                input.value = '';
                input.focus();


                // Adding conditional for the number that the user entered inside the input value...
                switch (pick) {
                    case 0: 

                        app.removeChild(alertContainer);
                        const message = document.createElement('p');
                        message.classList.add('closing-msg');
                        linksContainer.innerHTML = '';
                        message.textContent = 'See you next time!';
                        app.appendChild(message);
                        break;

                    case 1:

                        if (links.length === 0) {
                            alert('There is no link')
                        } else {
                            updateLinksList();
                        }
                        break;

                    case 2:

                        const title = (prompt('Please enter a title: ', "title")).trim();
                        const url = (prompt('Please enter a link: ', "link")).trim();
                        const author = (prompt('Please enter the name of the author: ', "author")).trim();

                        addNewLink(title, url, author);
                        updateLinksList();
                        break;

                    case 3:

                       if (links.length === 0) {
                        alert('There is no link to delete');
                       } else {
                        const digit = parseInt(prompt('Enter the number of the link to delete: ')) - 1;
                        deleteLink(digit);
                       }
                       break;

                    default:
                        alert('Pressed the wrong key');
                        break;
                }
            }

        })

        buttonContainer.appendChild(cancelButton);
        buttonContainer.appendChild(okButton);

        container.appendChild(buttonContainer);

        return container;
    }


    // Delete Link function 
    function deleteLink(digit) {
        if (links.length < 0 ) {
            alert('There is no link to delete');
        } else if (digit > links.length) {
            alert('You have gone passed the links size limit');
        } else {
            alert(`The below link has been deleted \n\n ${links[digit].defineLink()} `);
            links.splice(digit, 1);
            updateLinksList();
        }
    }
     
    //DYNAMICALLY GENERate new links list functionality
    function updateLinksList() {
        linksContainer.innerHTML = '';
        const heading = document.createElement('h1');
        heading.textContent = 'List of links';
        linksContainer.appendChild(heading);
        links.forEach((link, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}: ${link.defineLink()}`;
            linksContainer.appendChild(li);
        });
    }

});

