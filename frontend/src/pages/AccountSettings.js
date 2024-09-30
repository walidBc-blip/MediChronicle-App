import React, { Component } from "react";
import { Modal, Tooltip, OverlayTrigger } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./AccountSettings.css";

class AccountSettings extends Component {
  state = {
    activeTab: "updatePersonalInformation",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    allergies: "",
    emergencyContact: "",
    bloodType: "",
    specialCondition: "",
    height: "",
    weight: "",
    showModal: false, // Added for modal dialog
  };

  setActiveTab = (tabName) => {
    this.setState({ activeTab: tabName });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCloseModal = () => this.setState({ showModal: false });
  handleShowModal = () => this.setState({ showModal: true });

  renderTooltip = (text) => <Tooltip>{text}</Tooltip>;

  renderPersonalInfoForm = () => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      allergies,
      emergencyContact,
      bloodType,
      specialCondition,
      height,
      weight,
    } = this.state;

    return (
      <form>
        <div className="form-group">
          <label>Profile Picture:</label>
          <div className="profile-picture">
            <i className="fas fa-user-circle"></i>
          </div>
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={firstName}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={lastName}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Email Address:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            className="form-control"
            name="phoneNumber"
            value={phoneNumber}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={address}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Allergies:</label>
          <input
            type="text"
            className="form-control"
            name="allergies"
            value={allergies}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Emergency Contact Number:</label>
          <input
            type="tel"
            className="form-control"
            name="emergencyContact"
            value={emergencyContact}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Blood Type:</label>
          <input
            type="text"
            className="form-control"
            name="bloodType"
            value={bloodType}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Special Medical Condition:</label>
          <input
            type="text"
            className="form-control"
            name="specialCondition"
            value={specialCondition}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Height:</label>
          <input
            type="text"
            className="form-control"
            name="height"
            value={height}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Weight:</label>
          <input
            type="text"
            className="form-control"
            name="weight"
            value={weight}
            onChange={this.handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    );
  };

  renderTabContent = () => {
    if (this.state.activeTab === "updatePersonalInformation") {
      return this.renderPersonalInfoForm(); // Render personal info form if tab is active
    } else if (this.state.activeTab === "accountPrivacy") {
      return (
        <div className="account-privacy">
          <div className="notification-preferences">
            <h3>Notification Preferences</h3>
            <div className="notification-options">
              <label>
                <input type="checkbox" name="emailNotifications" />
                Email Notifications
              </label>
              <label>
                <input type="checkbox" name="smsNotifications" />
                SMS Notifications
              </label>
              <label>
                <input type="checkbox" name="inAppNotifications" />
                In-App Notifications
              </label>
              {/* Add more checkboxes for different notification types */}
            </div>
          </div>
          <div className="privacy-policy">
            <h3>Privacy Policy and Terms of Service</h3>
            <div className="policy-links">
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms-of-service">Terms of Service</a>
            </div>
          </div>
          <div className="profile-visibility">
            <h3>Profile Visibility</h3>
            <div className="visibility-options">
              <label>
                <input type="radio" name="profileVisibility" value="public" />
                Public Profile
              </label>
              <label>
                <input type="radio" name="profileVisibility" value="private" />
                Private Profile
              </label>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Account Privacy Content</div>; // Render account privacy content for other tab
    }
  };

  render() {
    return (
      <div className="account-settings">
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Settings Updated</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your account settings have been successfully updated.
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary"
              onClick={this.handleCloseModal}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>

        <div className="container mt-5">{this.renderTabContent()}</div>
      </div>
    );
  }
}

export default AccountSettings;
