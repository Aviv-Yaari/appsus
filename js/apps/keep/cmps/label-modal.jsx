export function LabelModal({ onAddLabel, labels }) {
    return (
        <div className="label-modal" >
            {!labels.includes('Important') && <button onClick={() => onAddLabel('Important')}>Important</button>}
            {!labels.includes('Music') && <button onClick={() => onAddLabel('Music')}>Music</button>}
            {!labels.includes('Hobbies') && <button onClick={() => onAddLabel('Hobbies')}>Hobbies</button>}
            {!labels.includes('Funny') && <button onClick={() => onAddLabel('Funny')}>Funny</button>}
            {!labels.includes('Sad') && <button onClick={() => onAddLabel('Sad')}>Sad</button>}
            {!labels.includes('My Stuff') && <button onClick={() => onAddLabel('My Stuff')}>My Stuff</button>}
        </div>
    )
}