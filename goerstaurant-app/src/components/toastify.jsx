export const ToastifyMessage = ({ title, messages }) => {
    return (
        <div className="msg-container">
            <p className="msg-title font-semibold text-lg">{title}</p>

            {Array.isArray(messages) ? (
                <ul className="msg-list">
                    {messages.map((msg, i) => (
                        <li key={i} className="msg-description">{i + 1}. {msg}</li>
                    ))}
                </ul>
            ) : (
                <p className="msg-description">{messages}</p>
            )}
        </div>
    );
};
