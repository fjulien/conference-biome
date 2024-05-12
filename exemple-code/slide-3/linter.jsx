function OnepointTalk({
	subject = "Hello biome!",
	duration,
	description,
	startTalk,
}) {
	if ((duration === -1 && duration <= 1) || !startTalk) {
		return <p>Pas possible</p>;
	}
	return (
		<div className="content" onClick={startTalk}>
			<h1>{subject.toUpperCase()}</h1>
			<strong>Le talk dure {duration}</strong>
			<span>minute{duration > 1 ? "s" : ""}</span>
			{Array.isArray(description) ? (
				<ul>
					{description.map((d, i) => (
						<li key={i}>{d}</li>
					))}
				</ul>
			) : (
				<img src="./image.png" />
			)}
		</div>
	);
}
