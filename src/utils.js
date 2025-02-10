export function todaydate() {
    const today = new Date();
    const numberOfDaysToAdd = 0;
    const date = today.setDate(today.getDate() + numberOfDaysToAdd);
    const defaultValue = new Date(date).toISOString().split('T')[0] // yyyy-mm-dd
    return defaultValue;
}

export function todayDateTime() {
    const today = new Date();
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    const defaultTime = `${hours}:${minutes}`;
    return defaultTime;
}


export const SUPPER_COLLABORATOR_TITLES = ["Director","Department Manager"]


export const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    return `${formattedDate} - ${formattedTime}`;
};

export function createISODate(date, time) {
    // Combine date and time into a single string
    const dateTimeString = `${date}T${time}:00.000Z`;
    
    // Create a new Date object from the combined string
    const isoDate = new Date(dateTimeString).toISOString();
    
    return isoDate;
}