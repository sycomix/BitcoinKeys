import React, { Component } from 'react';
import { Button, Modal, FormControl, FormGroup, ControlLabel, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { auth, db } from '../../firebase';


class RegModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            regist_login: true,
            email: '',
            password: '',
            error: null,
            success: null,
        };
    }

    handleChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    handleChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    registUser = () => {
        let email = this.state.email;
        let password = this.state.password;
        auth.doCreateUserWithEmailAndPassword(email, password)
            .then((authData) => {
                db.doCreateUser(authData.user.uid, email, password)
                    .then((data) => {
                        this.props.closeRegistModal()
                        this.deleteErrors();
                    })
                    .catch(error => {
                        this.setState({ error: error })
                    })
            })
            .catch(error => {
                this.setState({ error: error })
                this.deleteErrors();
            })
    }


    loginUser = () => {
        let email = this.state.email;
        let password = this.state.password;
        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.closeRegistModal()
            })
            .catch(error => {
                this.setState({ error: error })
                this.deleteErrors();
            });

    }

    resetPassword = () => {
        let email = this.state.email;
        auth.doPasswordReset(email)
            .then((data) => {
                this.setState({success: 'Password sent successfully to email'})
                setTimeout(()=>{
               this.props.closeRegistModal();
               this.setState({success: null})
                },3000)
            })
            .catch(error => {
                this.setState({ error: error });
                this.deleteErrors();
            });
    }

    deleteErrors = () =>{
        setTimeout(()=>{
            this.setState({error: null})
             },5000)
    }

    getValidationForEmail() {
        const data = this.state.email;
        let reg = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (reg.test(data) === true) {
            return 'success';
        } else if (reg.test(data) === false) {
            return 'error';
        }
        return null;
    }

    getValidationForPassword() {
        const data = this.state.password;
        let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
        if (reg.test(data) === true && data.length >= 6) {
            return 'success';
        } else if (reg.test(data) === false && data.length < 6) {
            return 'error'
        };
        return null;
    }


    showRegist = () => {
        this.setState({ regist_login: true })
    }

    showLogin = () => {
        this.setState({ regist_login: false })
    }

    render() {

        return (
            <div>
                <Modal show={this.props.statusRegistModal} onHide={this.props.closeRegistModal}>
                    {this.state.regist_login && <div><Modal.Header closeButton>
                        <Modal.Title className="titleModalRegist text-center">Login User <span className="loginTextTitle" onClick={this.showLogin}>(Register?)</span></Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup
                                    controlId="Email"
                                    validationState={this.getValidationForEmail()}
                                >
                                    <ControlLabel>Email (valid email address, please)</ControlLabel>
                                    <FormControl
                                        type="email"
                                        value={this.state.email}
                                        placeholder="Enter email"
                                        onChange={this.handleChangeEmail}
                                    />
                                    <FormControl.Feedback />
                                </FormGroup>
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.getValidationForPassword()}
                                >
                                    <ControlLabel>Password (6+ characters long, letters and numbers)</ControlLabel>
                                    <FormControl
                                        type="password"
                                        value={this.state.password}
                                        placeholder="Enter email"
                                        onChange={this.handleChangePassword}
                                    />
                                    <FormControl.Feedback />
                                </FormGroup>
                                {this.getValidationForEmail() === 'success' && <p onClick={this.resetPassword} className="text-center resetPassword">Reset password for {this.state.email}</p>}
                                <Button onClick={this.loginUser} disabled={this.getValidationForEmail() === 'error' || this.getValidationForPassword() === 'error'} className="buttonSubmit" bsStyle="primary" bsSize="large" block>
                                    Let's go!
                                </Button>
                            </form>
                            {this.state.error != null && <Alert style={{ marginTop: 20, marginBottom: 0 }} bsStyle="danger">{this.state.error.message}</Alert>}
                            {this.state.success != null && <Alert style={{ marginTop: 20, marginBottom: 0 }} bsStyle="success">{this.state.success}</Alert>}
                        </Modal.Body></div>}

                    {!this.state.regist_login && <div><Modal.Header closeButton>
                        <Modal.Title className="text-center titleModalRegist">Registration <span className="loginTextTitle" onClick={this.showRegist}>(Login?)</span></Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup
                                    controlId="Email"
                                    validationState={this.getValidationForEmail()}
                                >
                                    <ControlLabel>Email (valid email address, please)</ControlLabel>
                                    <FormControl
                                        type="email"
                                        value={this.state.email}
                                        placeholder="Enter email"
                                        onChange={this.handleChangeEmail}
                                    />
                                    <FormControl.Feedback />
                                </FormGroup>
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.getValidationForPassword()}
                                >
                                    <ControlLabel>Password (6+ characters long, letters and numbers)</ControlLabel>
                                    <FormControl
                                        type="password"
                                        value={this.state.password}
                                        placeholder="Enter email"
                                        onChange={this.handleChangePassword}
                                    />
                                    <FormControl.Feedback />
                                </FormGroup>
                                <Button onClick={this.registUser} disabled={this.getValidationForEmail() === 'error' || this.getValidationForPassword() === 'error'} className="buttonSubmit" bsStyle="primary" bsSize="large" block>
                                    Let's go!
                                </Button>
                            </form>
                            {this.state.error != null && <Alert style={{ marginTop: 20, marginBottom: 0 }} bsStyle="danger">{this.state.error.message}</Alert>}
                        </Modal.Body></div>}
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        statusRegistModal: state.basic.registModal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeRegistModal: () => dispatch({
            type: "CLOSE_REGIST_MODAL",
            registModalClose: false
        }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegModal);