function WText({ widget, ChangeBanner }) {
  return (
    <div
      className="widget"
      data-id={widget.id}
      key={widget.id}
      data-type={widget.type}
    >
      <div className="type">{widget.type}</div>
      <div className="value">
        <input
          type="text"
          onChange={ChangeBanner}
          defaultValue={widget.value}
        />
      </div>
      <div className="location">
        <div className="x">
          <label htmlFor="x">X :</label>
          <input
            name="x"
            type="number"
            min="0"
            max="1500"
            step="10"
            onChange={ChangeBanner}
            defaultValue={widget.x}
          />
        </div>
        <div className="y">
          <label htmlFor="x">Y :</label>
          <input
            name="y"
            type="number"
            min="0"
            max="1500"
            step="10"
            onChange={ChangeBanner}
            defaultValue={widget.y}
          />
        </div>
      </div>
      <div className="betfont">
        <div className="style">
          <select name="style" onChange={ChangeBanner} defaultValue={widget.style}>
            <option value="normal">Aucun</option>
            <option value="italic">Italique</option>
            <option value="oblique">Oblique</option>
            <option value="bold">Gras</option>
          </select>
        </div>
        <div className="size">
          <input
            type="number"
            name="size"
            defaultValue={widget.size ? widget.size : 20}
            min="1"
            onChange={ChangeBanner}
          />{" "}
          pt{" "}
        </div>
        <div className="family">
          <select name="family" onChange={ChangeBanner} defaultValue={widget.family}>
            <option value="Arial">Arial</option>
            <option value="Menlo">Menlo</option>
            <option value="Verdana">Verdana</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="serif">serif</option>
            <option value="sans-serif">sans-serif</option>
          </select>
        </div>
      </div>
    </div>
  );
}
export default WText;
