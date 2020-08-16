import React from 'react';
import Modal from '../components/modal/modal';
import Backdrop from '../components/backdrop/backdrop';
import EventList from '../components/Events/EventList/EventList'
import './events.css';
import AuthContext from '../context/authcontext';
import { ApiRequest, ApiRequestWithAuth } from '../functions';

export default class EventsSection extends React.Component {
    state = {
        creating: false,
        events: []
    };
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.titleElRef = React.createRef();
        this.priceElRef = React.createRef();
        this.dateElRef = React.createRef();
        this.descriptionElRef = React.createRef();
    }
    componentDidMount() {
        this.fetchEvents();
    }
    startCreateEventHandler = () => {
        this.setState({ creating: true });
    };
    modalConfirmHandler = async () => {
        this.setState({ creating: false });
        const title = this.titleElRef.current.value;
        const price = +this.priceElRef.current.value;
        const date = this.dateElRef.current.value;
        const description = this.descriptionElRef.current.value;
        if (
            title.trim().length === 0 ||
            price <= 0 ||
            date.trim().length === 0 ||
            description.trim().length === 0
        ) {
            return;
        }
        const requestBody = {
            query: `
              mutation {
                createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
                  _id
                  title
                  description
                  date
                  price
                  creator {
                    _id
                    email
                  }
                }
              }
            `
        };
        const token = this.context.token;
        const response = await ApiRequestWithAuth(requestBody, token);
        const { status } = response;
        if (status === 200) {
            this.fetchEvents();
        }
    };
    showDetailHandler = eventId => {
        this.setState(prevState => {
            const selectedEvent = prevState.events.find(e => e._id === eventId);
            return { selectedEvent: selectedEvent };
        });
    };

    modalCancelHandler = () => {
        this.setState({ creating: false, selectedEvent: null });
    };

    fetchEvents = async () => {
        const requestBody = {
            query: `
              query {
                events {
                  _id
                  title
                  description
                  date
                  price
                  creator {
                    _id
                    email
                  }
                }
              }
            `
        };
        const response = await ApiRequest(requestBody);
        const { data, status } = response;
        if (status === 200) {
            const { events } = data.data;
            this.setState({ events: events });
        }
    }
    bookEventHandler = () => { };

    render() {


        return (
            <React.Fragment>
                {(this.state.creating || this.state.selectedEvent) && <Backdrop />}
                {this.state.creating && (
                    <Modal
                        title="Add Event"
                        canCancel
                        canConfirm
                        onCancel={this.modalCancelHandler}
                        onConfirm={this.modalConfirmHandler}
                        confirmText="Confirm"
                    >
                        <form>
                            <div className="form-control">
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" ref={this.titleElRef} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="price">Price</label>
                                <input type="number" id="price" ref={this.priceElRef} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="date">Date</label>
                                <input type="datetime-local" id="date" ref={this.dateElRef} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    rows="4"
                                    ref={this.descriptionElRef}
                                />
                            </div>
                        </form>
                    </Modal>
                )}
                {this.state.selectedEvent && (
                    <Modal
                        title={this.state.selectedEvent.title}
                        canCancel
                        canConfirm
                        onCancel={this.modalCancelHandler}
                        onConfirm={this.bookEventHandler}
                        confirmText="Book"
                    >
                        <h1>{this.state.selectedEvent.title}</h1>
                        <h2>
                            ${this.state.selectedEvent.price} -{' '}
                            {new Date(this.state.selectedEvent.date).toLocaleDateString()}
                        </h2>
                        <p>{this.state.selectedEvent.description}</p>
                    </Modal>
                )}
                {this.context.token && (
                    <div className="events-control">
                        <p>Share your own Events!</p>
                        <button className="btn" onClick={this.startCreateEventHandler}>
                            Create Event
                </button>
                    </div>
                )}
                {this.state.isLoading ? (
                    null
                ) : (
                        <EventList
                            events={this.state.events}
                            authUserId={this.context.userId}
                            onViewDetail={this.showDetailHandler}
                        />
                    )}
            </React.Fragment>
        );
    }
}