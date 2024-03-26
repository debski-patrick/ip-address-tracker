import { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import "./mNormalize.css";
import styled from "styled-components";
import axios from 'axios';

import iconArrow from "./assets/icons/icon-arrow.svg";
import iconLocation from "./assets/icons/icon-location.svg";
import TableInfo from './components/TableInfo';

const Title = styled.h1`
	margin: 0 auto;
	padding: 2rem;
	font-size: 28px;
	letter-spacing: 1px;
	color: white;
`
const FormInfo = styled.form`
	width: 85%;
	max-width: 35rem;
	margin: 0 auto 51px auto;
	position: relative;
	input{
		padding: 18px 25px;
		border-radius: 13px;
		border: none;
		width: 99%;
		padding-right: 5rem;
		letter-spacing: 1px;
	}
	button{
		border: none;
		background: var(--VeryDarkGray);
		border-radius: 0 13px 13px 0;
		padding: 18px 25px;
		cursor: pointer;
		position: absolute;
		right: 0;
		img{
			vertical-align: middle;
		}
	}
	button:hover{
		opacity: .8;
	}
`
const Atribution = styled.p`
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 50;
	margin: 5px;
	font-size: 14px;
	font-weight: 500;
`

function App() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [info, setInfo] = useState(
		{
			"ip": "192.212.174.101",
			"location": {
				"region": `Broolyn, NY 10001`,
				"timezone": "-05:00",
				"lat": "43.731567",
				"lng": "7.414932"
			},
			"isp": "SpaceX Starlink"
		}
	);

	var locationIcon = L.icon({
		iconUrl: iconLocation,
		iconSize: [40, 50], // size of the icon
		iconAnchor: [23, 0], // point of the icon which will correspond to marker's location
	});

	function getInfo(ip = "192.212.174.101", domain = "") {
		setLoading(true)

		axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_KWi4iJ3mHvSf60uE9YdyDDLUo2owD&ipAddress=${ip}&domain=${domain}`)
			.then(function (res) {
				setInfo(res.data);
			})
			.catch(function (error) {
				setError(error.message)
			})
			.then(() => setLoading(false));
	}

	function handleSubmit(e) {
		e.preventDefault();
		let ipValue = e.target.elements['ip'].value.trim();

		const IP_REGEX = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/
		const DOMAIN_REGEX = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g

		if (IP_REGEX.test(ipValue)) return getInfo(ipValue);
		if (DOMAIN_REGEX.test(ipValue)) return getInfo("", ipValue);
		setError("Please enter a valid IP address or domain")
	}

	return (
		<>
			<Title>IP Address Tracker</Title>
			<FormInfo onSubmit={handleSubmit}>
				<input type="search" name='ip' placeholder='Search for any IP address or domain' />
				<button aria-label='Send'><img src={iconArrow} alt="Send" /></button>
			</FormInfo>

			<TableInfo loading={loading} error={error} info={info} />

			<MapContainer key={JSON.stringify([info.location.lat, info.location.lng])} center={[info.location.lat || 0, info.location.lng || 0]} zoom={17.5} id="map">
				<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Marker position={[info.location.lat || 0, info.location.lng || 0]} icon={locationIcon}></Marker>
			</MapContainer>

			<Atribution>
				Made with ♥️ by <a href="https://github.com/cosmoart" target="_blank" rel="noopener noreferrer">Cosmo</a> - <a href="https://github.com/cosmoart/IP-address-tracker" target="_blank" rel="noopener noreferrer">Repository</a>
			</Atribution>
		</>
	)
}

export default App
