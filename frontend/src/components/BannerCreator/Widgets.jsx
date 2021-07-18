import axios from "axios";

function Widgets({ Banner, ReloadImg }) {
  const ChangeBanner = () => {
    const widgets = document.querySelectorAll(".widget");
    widgets.forEach((widget, index) => {
      if (Banner.widgets[index].id === widget.dataset.id) {
        Banner.widgets[index].value =
          widget.querySelector(".value input").value;
        Banner.widgets[index].x =
          widget.querySelector(".location .x input").value;
        Banner.widgets[index].y =
          widget.querySelector(".location .y input").value;
        Banner.widgets[index].font = widget.querySelector(".font input")
          ? widget.querySelector(".font input").value
          : false;
      }
    });
    axios.post(`/banner/${Banner.user}`, Banner);
    ReloadImg();
  };
  if (Banner) {
    return (
      <div className="widgets">
        {Banner.widgets.map((widget) => {
          return (
            <div className="widget" data-id={widget.id} key={widget.id}>
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
                  <input
                    type="number"
                    min="0"
                    max="1500"
                    step="10"
                    onChange={ChangeBanner}
                    defaultValue={widget.x}
                  />
                </div>
                <div className="y">
                  <input
                    type="number"
                    min="0"
                    max="1500"
                    step="10"
                    onChange={ChangeBanner}
                    defaultValue={widget.y}
                  />
                </div>
              </div>
              {widget.font ? (
                <div className="font">
                  <input
                    type="text"
                    onChange={ChangeBanner}
                    defaultValue={widget.font}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    );
  }
  return <div>Appuye sur New</div>;
}
export default Widgets;
