import swal from 'sweetalert';

const displayCopyingSuccessfulAlert = () => {
    swal({
        title: 'Successfully Coppied!',
        text: 'Text coppied to the clipboard.',
        icon: 'success',
        timer: 2500,
        button: false
    });
};

const displayCopyingErrorAlert = () => {
    swal({
        title: 'Coyping Unsuccessful!',
        text: 'An error occured whily copying to the clipboard.',
        icon: 'error',
        button: true
    });
};

const fallbackCopyTextToClipboard = text => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        const msg = successful
            ? displayCopyingSuccessfulAlert()
            : displayCopyingErrorAlert();
    } catch (err) {
        displayCopyingErrorAlert();
    }

    document.body.removeChild(textArea);
};
const copyTextToClipboard = text => {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(
        () => {
            displayCopyingSuccessfulAlert();
        },
        () => {
            displayCopyingErrorAlert();
        }
    );
};

export { copyTextToClipboard };
