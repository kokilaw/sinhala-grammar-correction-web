import swal from 'sweetalert';

const getErrorDisplayData = (request, response) => {
    if (response) {
        return {
            title: 'Server Problem!',
            text: 'Problem connecting with our servers. Please try again.'
        };
    } else if (request) {
        return {
            title: 'Connection Problem!',
            text: 'Please check your connection.'
        };
    }
    return {
        title: 'Unknown Error Occured!',
        text: 'Please try again later.'
    };
};

const handleErrorAlerts = errorData => {
    const errorDisplayData = getErrorDisplayData(
        errorData.request,
        errorData.response
    );
    swal({
        title: errorDisplayData.title,
        text: errorDisplayData.text,
        icon: 'error',
        button: true
    });
};

export { handleErrorAlerts };
