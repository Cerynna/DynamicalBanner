import axios from "axios";
import WText from "./WText";
import WBackground from "./WBackground";

function Widgets({ Banner, ReloadImg }) {
  console.log(Banner);
  const ChangeBanner = () => {
    const widgets = document.querySelectorAll(".widget");
    widgets.forEach((widget, index) => {
      console.log(widget);
      if (Banner.widgets[index].id === widget.dataset.id) {
        // console.log(Banner.widgets[index].type);
        switch (Banner.widgets[index].type) {
          case "text":
            Banner.widgets[index].value =
              widget.querySelector(".value input").value;
            Banner.widgets[index].x =
              widget.querySelector(".location .x input").value;
            Banner.widgets[index].y =
              widget.querySelector(".location .y input").value;
            Banner.widgets[index].size =
              widget.querySelector(".size input").value;
            Banner.widgets[index].family =
              widget.querySelector(".family select").value;
            Banner.widgets[index].style =
              widget.querySelector(".style select").value;
            break;
          case "background":
            Banner.background = widget.querySelector(".value select").value;
            Banner.widgets[index].value =
              widget.querySelector(".value select").value;
            break;

          default:
            break;
        }
      }
    });
    axios.post(`/banner/${Banner.user}`, Banner).then(() => {
      ReloadImg();
    });
  };
  if (Banner) {
    return (
      <div className="widgets">
        {Banner.widgets.map((widget) => {
          switch (widget.type) {
            case "text":
              return (
                <WText
                  widget={widget}
                  ChangeBanner={ChangeBanner}
                  key={widget.id}
                />
              );
            case "background":
              return (
                <WBackground
                  widget={widget}
                  ChangeBanner={ChangeBanner}
                  key={widget.id}
                />
              );
            case "twitter":
              return (
                <div
                  className="widget"
                  data-id={widget.id}
                  key={widget.id}
                ></div>
              );
            default:
              return false;
          }
        })}
      </div>
    );
  }
  return <div>Appuye sur New</div>;
}
export default Widgets;
