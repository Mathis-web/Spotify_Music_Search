function Error({content}) {

    const errorStyle = {
        color: 'red',
        margin: '1rem 0'
    };

    return(
        <p className="error" style={errorStyle}>{content}</p>
    );
}

export default Error;