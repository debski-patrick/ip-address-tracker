import iconLoader from "../assets/icons/loader.svg"
import styled from "styled-components";

const ErrorMessage = styled.p`
	margin: auto;
	font-size: 20px;
	font-weight: 500;
	display: flex;
    flex-direction: column;
    align-items: center;
	gap: 15px;
	svg{
		transform: scale(1.4);
	}
`
const TableUL = styled.ul`
	position: relative;
	z-index: 20;
	width: 90%;
	max-width: 69rem;
	margin: auto;
	background: white;
	border-radius: 14px;
	padding: 2rem;
	text-align: left;
	display: inline-flex;
	justify-content: space-between;
	list-style: none;
	text-align: left;
	gap: 54px;
	min-height: 9rem;
	li{
		width: calc(100%/4);
		padding-right: 3rem;
	}
	span{
		display: block;
		font-weight: 500;
	}
	span:first-of-type{
		text-transform: uppercase;
		letter-spacing: 2px;
		font-size: 13px;
		opacity: .8;
	}
	span:last-of-type{
		padding-top: 18px;
		font-size: 24px;
		font-size: clamp(17px,2.3vw,24px);
		font-weight: bold;
	}
	@media screen and (max-width: 770px) {
		flex-direction: column;
		text-align: center;
		align-items: center;
		max-width: 30rem;
		gap: 20px;
		li{
			width: auto;
		}
		span:last-of-type{
			padding-top:6px;
		}
	}
	@media screen and (max-width: 1300px) {
		li{
			padding-right: 0;
		}
	}
`

export default function TableInfo({ loading, error, info }) {

	if (loading) return (
		<TableUL>
			<img src={iconLoader} width="11" height="14" title="Loading..." style={{ "height": "2.5rem", "margin": "auto" }} />
		</TableUL>
	)

	if (error) return (
		<TableUL>
			<ErrorMessage>
				<svg fill="#ff4848" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M23 7.444v9.112L16.556 23H7.444L1 16.556V7.444L7.444 1h9.112L23 7.444ZM15.728 3H8.272L3 8.272v7.456L8.272 21h7.456L21 15.728V8.272L15.728 3ZM12 17.998a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-.997-12h2v8h-2v-8Z" /></svg>
				{error || "Oops something is wrong"}
			</ErrorMessage>
		</TableUL>
	)

	return (
		<TableUL>
			<li><span>IP Address:</span><span>{info.ip || "---"}</span></li>
			<li><span>Location:</span><span>{info.location.region || "---"}</span></li>
			<li><span>Timezone:</span><span>UTC {info.location.timezone || "---"}</span></li>
			<li><span>ISP:</span><span>{info.isp || "---"}</span></li>
		</TableUL>
	)
}