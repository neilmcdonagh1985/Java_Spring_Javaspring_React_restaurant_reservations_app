import React from "react";
import { render } from "react-dom";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, Appointments, DayView } from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
// import { appointments } from "./BookingsData";
// import BookingData from './BookingsData';

const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

class Calendar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            bookingsData: [

            ]
        };
    }

    formatDateTime(date, time) {
        const a = new Date(date)
        let month = '' + (a.getMonth() - 1)
        if (month.length < 2) { month = '0' + month }
        let day = '' + a.getDate()
        if (day.length < 2) { day = '0' + day }
        let year = a.getFullYear()
        const b = new Date(time)
        let hour = '' + (b.getHours())
        if (hour.length < 2) { hour = '0' + hour }
        let minutes = '' + b.getMinutes()
        if (minutes.length < 2) { minutes = '0' + minutes }
        return [year, month, day, hour, minutes].join(', ');
    }

    componentDidMount() {
        fetch('http://localhost:8080/bookings')
            .then(response => response.json())
            .then(jsonData => this.setState({ bookingsData: jsonData['_embedded'].bookings }));
    }

    render() {
        // console.log(this.state.bookingsData[0] && this.state.bookingsData[0].date);

        const { bookingsData } = this.state;

        return (
            <div className="calendar">
                <MuiThemeProvider theme={theme}>
                    <Paper>
                        <Scheduler data={bookingsData}>
                            <ViewState currentDate={new Date()} />
                            <DayView startDayHour={12} endDayHour={23} />
                            <Appointments />
                        </Scheduler>
                    </Paper>
                </MuiThemeProvider>
            </div>
        );
    }
}

// render(<Calendar />, document.getElementById("root"));

export default Calendar;