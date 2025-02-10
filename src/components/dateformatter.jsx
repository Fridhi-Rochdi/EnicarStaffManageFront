const DateFormatter = ({ timestamp }) => {
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = date.getDate();
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });

        return `${day} ${month} ${year}`;
    };

    return (
        <div>
            {formatDate(timestamp)}
        </div>
    );
};

export default DateFormatter;