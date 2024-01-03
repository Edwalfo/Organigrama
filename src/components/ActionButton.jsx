
const ActionButton = ({ actionType, onClick }) => {
    return (
        <button
            className={`btn ${actionType === 'edit' ? 'btn-warning' : 'btn-danger'} btn-sm me-1`}
            onClick={onClick}
        >
            <i className={`fas ${actionType === 'edit' ? 'fa-edit' : 'fa-trash-alt'}`}></i>
        </button>
    );
};

export default ActionButton;