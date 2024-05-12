function OnepointTalk	({
                              subject		= "Hello biome!"	, duration		,
                              description		, startTalk		,
                          }	) {
    if		(duration		<= 1		||		!startTalk	 )	 {
        return  <p>Pas possible </p>  }

    return (	 <div className="content" onClick={startTalk}>
        <h1>{subject  .toUpperCase ( ) }</h1>
        <strong		>Le talk dure {duration }</strong>
        <span	>minute{duration > 1 ? "s" : ""}	 }</span>
        {Array	.isArray		(description	 )  ?	( <ul>
            {description .map  ((d , i )	=> ( <li key  ={i}>{d }</li>  )	)	 }
        </ul>	 )	 :	( <p>{description		}</p>  )	 }
    </div>	) ;	 }

// npx @biomejs/biome format --write .\exemple-code\playground.jsx
// npx biome lint --apply  .\exemple-code\playground.jsx
// npx biome check --apply  .\exemple-code\playground.jsx
// npx biome check --apply-unsafe  .\exemple-code\playground.jsx
