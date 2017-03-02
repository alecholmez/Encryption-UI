class Encrypt extends React.Component {
    constructor() {
        super();
        this.state = {
            encryptionText: '',
            encryptionKey: '',
            decryptionText: '',
            decryptionKey: '',
            encryptedText: '',
            decryptedText: ''
        }
    }

    _encryptText(key, text) {
        $.ajax({
            type: 'POST',
            url: 'https://encrypt-api.herokuapp.com/encrypt',
            data: JSON.stringify({
                key: key,
                text: text
            }),
            success: function(data) {
                this.setState({
                    encryptedText: JSON.parse(data).text
                })
            }.bind(this)
        })
    }

    _decryptText(key, text) {
        $.ajax({
            type: 'POST',
            url: 'https://encrypt-api.herokuapp.com/decrypt',
            data: JSON.stringify({
                key: key,
                text: text
            }),
            success: function(data) {
                this.setState({
                    decryptedText: JSON.parse(data).text
                })
            }.bind(this)
        })
    }

    handleEncryptText(event) {
        this.setState({
            encryptionText: event.target.value
        })
    }

    handleEncryptKey(event) {
        this.setState({
            encryptionKey: event.target.value
        })
    }


    handleDecryptText(event) {
        this.setState({
            decryptionText: event.target.value
        })
    }

    handleDecryptKey(event) {
        this.setState({
            decryptionKey: event.target.value
        })
    }

    handleEncryptButton(event) {
        this._encryptText(this.state.encryptionKey, this.state.encryptionText)
    }

    handleDecryptButton(event) {
        this._decryptText(this.state.decryptionKey, this.state.decryptionText)
    }

    render() {
        return (
            <div>
                <div is uk-height-viewport="offset-bottom: 20" class="uk-container uk-margin-top">
                    <h1 className="uk-heading-line uk-text-center"><span>{'Encrypt'}</span></h1>
                    <p className="uk-text-lead uk-text-center">{'A simple tool for testing out AES 256 bit encryption and base64 encoding!'}</p>
                    <p className="uk-text-center">{'If you have text that has been encrypted in AES 256, then encoded in base64, you can decode it with this tool. Otherwise if you have encrypted text only, you must encode it in base64 for this tool to work *vice versa*'}</p>

                    <div is uk-grid class="uk-child-width-1-2 uk-flex-center">

                        <div>
                            <div className="uk-card uk-card-default uk-card-large uk-overflow-auto">
                                <div className="uk-card-body">
                                    <fieldset className="uk-fieldset">
                                        <legend className="uk-legend uk-margin-bottom">{'Encrypt Text'}</legend>
                                        <form>
                                            <div className="uk-margin">
                                                <div className="uk-form-controls">
                                                    <textarea className="uk-textarea" onChange={this.handleEncryptText.bind(this)} type="text" placeholder="Text To Encrypt"></textarea>
                                                </div>
                                            </div>

                                            <div className="uk-margin">
                                                <div className="uk-form-controls">
                                                    <input className="uk-input" onChange={this.handleEncryptKey.bind(this)} type="text" placeholder="Encryption Key" />
                                                </div>
                                            </div>
                                        </form>
                                    </fieldset>
                                    <button className="uk-button uk-button-primary" onClick={this.handleEncryptButton.bind(this)}>{'Encrypt'}</button>
                                </div>
                                <div className="uk-card-footer">
                                    <p className="uk-text-center uk-text-bold">{'Encrypted text: '}</p>
                                    <p className="uk-text-center uk-text-break light-text">{this.state.encryptedText}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="uk-card uk-card-default uk-card-large uk-overflow-auto">
                                <div className="uk-card-body">
                                    <fieldset className="uk-fieldset">
                                        <legend className="uk-legend uk-margin-bottom">{'Decrypt Text'}</legend>
                                        <form>
                                            <div className="uk-margin">
                                                <div className="uk-form-controls">
                                                    <textarea className="uk-textarea" onChange={this.handleDecryptText.bind(this)} type="text" placeholder="Text To Decrypt"></textarea>
                                                </div>
                                            </div>

                                            <div className="uk-margin">
                                                <div className="uk-form-controls">
                                                    <input className="uk-input" onChange={this.handleDecryptKey.bind(this)} type="text" placeholder="Decryption Key" />
                                                </div>
                                            </div>
                                        </form>
                                    </fieldset>
                                    <button className="uk-button uk-button-primary" onClick={this.handleDecryptButton.bind(this)}>{'Decrypt'}</button>
                                </div>
                                <div className="uk-card-footer">
                                    <p className="uk-text-center uk-text-bold">{'Decrypted text: '}</p>
                                    <p className="uk-text-center uk-text-break light-text">{this.state.decryptedText}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="uk-section uk-background-muted uk-text-center">
                    <p>API powering this site: <a href="https://encrypt-api.herokuapp.com/">Encrypted API</a></p>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
  <Encrypt />,
  document.getElementById('app')
);
