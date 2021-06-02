export default function DeleteModal({displayDeleteFightModal, setDisplayDeleteFightModal, deleteConfirm}) {
    return (
            <div className={`modal ${displayDeleteFightModal}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Confirm Delete</p>
                        <button className="delete" aria-label="close" onClick={() => setDisplayDeleteFightModal("")}></button>
                    </header>
                    <section className="modal-card-body">
                        <p>You are about to delete one fight.</p>
                        <p>Do you want to proceed?</p>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-danger" onClick={deleteConfirm}>Delete</button>
                        <button className="button"  onClick={() => setDisplayDeleteFightModal("")}>Cancel</button>
                    </footer>
                </div>
            </div>
    )
}