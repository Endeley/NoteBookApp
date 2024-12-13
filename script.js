const textInput = document.querySelector('.text-input');
const icons = document.querySelectorAll('.fa-regular, .fa-plus');
const headingDiv = document.querySelector('.heading-div');
const rightSideContainer = document.querySelector('.right-container');
const headText = document.querySelector('.heading-text');
const textAreaDiv = document.querySelector('.textArea-div');
const textArea = document.querySelector('.text-area');
const saveNoteBtn = document.querySelector('.save-NoteBtn');

// local storage
const LOCAL_STORAGE_KEY = 'headingData';
let headingData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
function saveToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(headingData));
}

function initializeUI() {
    // addeventListers
    icons.forEach((icon) => {
        icon.addEventListener('click', () => {
            textInput.style.display = 'block';
            textInput.focus();
            icons.forEach((icon) => (icon.style.display = 'none'));
        });
    });
    textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            // Create a new folder (heading div)
            const headings = document.createElement('div');
            headings.classList.add('headings');
            headings.textContent = textInput.value;
            headingDiv.appendChild(headings);

            headingData[textInput.value] = [];
            saveToLocalStorage();

            //  clear input field
            textInput.value = '';
            textInput.style.display = 'none';
            icons.forEach((icon) => (icon.style.display = 'block'));

            // Attach click event directly to the new heading
            const headingFolder = document.querySelectorAll('.headings');
            headingFolder.forEach((folder) => {
                folder.addEventListener('click', () => {
                    headingFolder.forEach((folder) => folder.classList.remove('active'));

                    // folder.classList.add('active');
                    folder.classList.add('active');

                    // Update note container with heading text
                    const NoteDiv = document.querySelector('.note-div');
                    NoteDiv.innerHTML = '';
                    headText.textContent = folder.textContent;
                    // NoteDiv.textContent = headText.textContent;

                    // Check if "create-note-btn" exists, and only add it once
                    if (!NoteDiv.querySelector('.create-note-btn')) {
                        const createNoteBtn = document.createElement('div');
                        createNoteBtn.classList.add('create-note-btn');
                        const createIcon = document.createElement('i');
                        createIcon.classList.add('fa-solid', 'fa-file-pen');
                        createNoteBtn.appendChild(createIcon);
                        NoteDiv.appendChild(createNoteBtn);
                        createIcon.addEventListener('click', () => {
                            textAreaDiv.style.display = 'block';
                        });
                    }

                    rightSideContainer.innerHTML = '';
                    rightSideContainer.appendChild(NoteDiv);

                    // headingFolder.forEach((folder) => folder.classList.add('active'));
                    // reset UI
                    // rightSideContainer.innerHTML = '';
                });
            });
        }
    });

    // createNote function
    function createNote() {
        textArea.innerHTML = '';
        textArea.focus();
    }

    function saveNote() {
        const NoteDiv = document.querySelector('.note-div');
        const paraGraph = document.createElement('div');
        paraGraph.classList.add('note');

        const p = document.createElement('p');
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-trash');
        p.classList.add('note-p');
        paraGraph.appendChild(icon);
        paraGraph.appendChild(p);
        NoteDiv.appendChild(paraGraph);
        textAreaDiv.style.display = 'none';
        p.textContent = textArea.textContent;
        console.log(paraGraph.textContent);
    }

    textArea.addEventListener('click', createNote);
    saveNoteBtn.addEventListener('click', saveNote);
}
initializeUI();
