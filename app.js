function app() {
    return {
        noteHeading: '',
        noteText: '',
        notes: [],

        loadNotes() {
            const storedNotes = localStorage.getItem('notes');
            if (storedNotes) {
                this.notes = JSON.parse(storedNotes);
            }
        },

        addNote() {
            if (this.noteText.trim() !== '') {
                const currentYear = new Date().getFullYear().toString().slice(-2);
                const timestamp = currentYear + new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/[^0-9]/g, '');
                const note = {
                    id: uuidv4().substring(0, 8),
                    heading: this.noteHeading,
                    text: this.noteText,
                    timestamp: timestamp
                };
                this.notes.push(note);
                this.noteText = '';
                this.noteHeading = '';
                this.saveNotes();
            }
        },

        updateNoteText(note) {
            this.saveNotes();
        },

        deleteNote(noteId) {
            this.notes = this.notes.filter(note => note.id !== noteId);
            this.saveNotes();
        },

        deleteAllNotes() {
            this.notes = [];
            this.saveNotes();
        },

        saveNotes() {
            localStorage.setItem('notes', JSON.stringify(this.notes));
        },

        copyNotes() {
            const notesCopy = JSON.stringify(this.notes);
            navigator.clipboard.writeText(notesCopy);
            alert('Notes copied to clipboard!');
        },

        
    };
}