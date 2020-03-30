import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Nav from "../../components/Nav/Nav.js";
import Nav2 from "../../components/Nav/Nav2.js";
import Alerts from "../../components/Alerts/Alerts";
import Footer from "../../components/Footer/Footer";
import PacketsTable from "../../components/MaterialUI/PacketsTable";
const client = new W3CWebSocket("ws://localhost:8000/ws/idps/");

class Home extends Component {
  state = {
    message: "",
    packets: [],
    alerts: [],
    testArray: [
      {
        pckt_src: "104.20.62.122",
        pckt_dst: "192.168.0.191",
        srcCountry: "United States",
        dstCountry: "United States",
        time: "2019-11-25 21:29:49",
        src_port: 443,
        dst_port: 51760
      }
    ],
    notify: ""
  };
  componentWillMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = message => {
      let data = JSON.parse(message.data);
      console.log("data = ", data);
      if (data.message) {
        console.log("DATA.MESSAGE = ", data.message);
        var joinedPackets = this.state.packets.concat(data.message);
        var joinedAlerts = this.state.alerts.concat(data.message.alerts);
        this.setState({
          message: data.message,
          packets: joinedPackets,
          alerts: joinedAlerts
        });
      }
      if (data.hasOwnProperty("notify") && this.state.notify !== data.notify) {
        this.setState({
          notify: data.notify !== "" ? data.notify : this.state.notify
        });
      }
    };
  }

  componentWillUnmount() {
    client.close();
  }

  sendStartCommand = r => {
    console.log("IN START");
    client.send(
      JSON.stringify({
        message: "start"
      })
    );
  };
  sendStopCommand = r => {
    console.log("IN STOP");
    client.send(
      JSON.stringify({
        message: "stop"
      })
    );
  };

  render() {
    return (
      <div className="box">
        <Nav2
          startSniffer={this.sendStartCommand}
          stopSniffer={this.sendStopCommand}
        />
        <div style={{ marginTop: "100px" }}></div>
        <Alerts alerts={this.state.alerts} />
        <PacketsTable packets={this.state.packets} />
        <Footer />
      </div>
    );
  }
}

export default Home;
