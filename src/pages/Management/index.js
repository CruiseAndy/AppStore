import React, {useState, useContext, useEffect} from 'react';
import Cookies from 'js-cookie';
import Form  from "./components/form";
import AuthContext from "../../context/AuthContext";
import {onRequest} from "../../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faCloudUploadAlt, faBezierCurve, faQuestionCircle, faLink, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { SweetAlert, Loading } from "../../components";
import Doce from "../../doce";
import "./Management.scss";
const Management = (props) => {
  const contextVal = useContext(AuthContext);
  const {logOutHandler} = contextVal;
  const [token] = useState("APEtZdqgbhMmVzUuOkYR");
  const [userName, setUserName] = useState(null);
  const [showLoad, setShowLoad] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebars] = useState(["upload", "point_to", "current"]);
  const [activeType ,setActiveType] = useState(sidebars[0]);
  const [forms ,setForms] = useState({
    upload: {
      site: {
        required: true,
        type: "select",
        value: "",
        options: [
          {
            label: "none",
            value: ""
          },
          {
            label: "aaaa",
            value: "aaaa"
          },
          {
            label: "fatcatEx",
            value: "fatcatEx"
          },
          {
            label: "fengchao",
            value: "fengchao"
          },
          {
            label: "vbo",
            value: "vbo"
          },
          {
            label: "MatchCat",
            value: "MatchCat"
          }
        ]
      },
      content: {
        required: true,
        type: "file",
        value: "",
      },
      cat: {
        required: true,
        type: "select",
        value: '',
        options: [
          {
            label: "none",
            value: ""
          },
          {
            label: "ios",
            value: "ios"
          },
          {
            label: "android",
            value: "android"
          }
        ],
      },
      filename: {
        required: true,
        type: "text",
        value: "",
      }
      // version: {
      //   required: false,
      //   type: "text",
      //   value: "",
      // }
    },
    point_to: {
      site: {
        required: true,
        type: "select",
        value: "",
        options: [
          {
            label: "none",
            value: ""
          },
          {
            label: "fatcatEx",
            value: "fatcatEx"
          },
          {
            label: "fengchao",
            value: "fengchao"
          },
          {
            label: "vbo",
            value: "vbo"
          },
          {
            label: "MatchCat",
            value: "MatchCat"
          }
        ]
      },
      cat: {
        required: true,
        type: "select",
        value: '',
        options: [
          {
            label: "none",
            value: ""
          },
          {
            label: "ios",
            value: "ios"
          },
          {
            label: "android",
            value: "android"
          }
        ]
      },
      version: {
        required: false,
        type: "text",
        value: "",
      }
    },
    current: {
      site: {
        required: true,
        type: "select",
        value: "",
        options: [
          {
            label: "none",
            value: ""
          },
          {
            label: "fatcatEx",
            value: "fatcatEx"
          },
          {
            label: "fengchao",
            value: "fengchao"
          },
          {
            label: "vbo",
            value: "vbo"
          },
          {
            label: "MatchCat",
            value: "MatchCat"
          }
        ]
      },
      cat: {
        required: false,
        type: "select",
        value: '',
        options: [
          {
            label: "none",
            value: ""
          },
          {
            label: "ios",
            value: "ios"
          },
          {
            label: "android",
            value: "android"
          }
        ]
      }
    }
  })
  const onChangeHandler = ({activeType, target}) => {
    const {name, value, type} = target;
    let val = null
    if (activeType === "upload" && name === "site") {
      onChangeHandler({activeType :"upload", target: {name: "filename", value, type: "text"}});
    };
    if (type === "file") {
      val = target.files[0]
    } else {
      val = value;
    }
    setForms(prevState => ({...prevState, [activeType]: {
      ...prevState[activeType],
      [name]: {
        ...prevState[activeType][name],
        value: val
      }
    }}))
  }
  const onSubmitHandler = type => {
    let content = "";
    switch (type) {
      case "upload":
        Object.keys(forms['upload']).forEach(item => {
          let val = null;
          if (forms.upload[item].type === "file") {
            val = forms.upload[item].value.name;
          } else {
            val = forms.upload[item].value
          }
          content += `<li><span class="title">${Doce.forms.alert[item]}:</span><span class="text">${val}</span></li>`
        });
        SweetAlert.fire({
          title: Doce.upload.alert.check,
          heightAuto: false,
          html: `<ul class="alert_content_list">${content}</ul>`,
          icon: 'warning',
          confirmButtonText: Doce.alerts.button.confirm,
          cancelButtonText: Doce.alerts.button.cancel,
          showLoaderOnConfirm: true,
          showCancelButton: true,
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) onUpLoad()
        })
        break;
      case "point_to":
        Object.keys(forms['point_to']).forEach(item => {
          content += `<li><span class="title">${Doce.forms.alert[item]}:</span><span class="text">${forms.point_to[item].value}</span></li>`
        });
        SweetAlert.fire({
          title: Doce.point_to.alert.check,
          heightAuto: false,
          html: `<ul class="alert_content_list">${content}</ul>`,
          icon: 'warning',
          confirmButtonText: Doce.alerts.button.confirm,
          cancelButtonText: Doce.alerts.button.cancel,
          showCancelButton: true,
          allowOutsideClick: false
        }).then((result) => {
          if(result.value) onPointTo()
        })
        break;
      case "current":
        onCurrent();
        break;
      default:
        return;
    }
  };
  const navClickHandler = (item) => {
    if (window.innerWidth <= 768) setShowSidebar(oldState => !oldState);
    setActiveType(item)
  }
  const onUpLoad = () => {
    setShowLoad(true);
    const params = {
      action: "upload",
      token
    };
    Object.keys(forms['upload']).forEach(item => {
      if (item === "filename") {
        const setDeputyName = cat => {
          switch (cat) {
            case "ios":
              return "ipa";
            case "android":
              return "apk";
            default:
              return "undefind";
          }
        }
        params.filename = `${forms.upload.site.value}.${setDeputyName(forms.upload.cat.value)}`;
      } else {
        params[item] = forms.upload[item].value;
      }
    });
    onRequest(params)
    .then(res=> {
      setShowLoad(false);
      SweetAlert.fire({
        title: Doce.upload.alert.success,
        icon: "success",
        html: `${res.data}`,
        timer: 3000,
        heightAuto: false,
        showConfirmButton: false
      })
    })
    .catch(err=> {
      setShowLoad(false);
      SweetAlert.fire({
        title: Doce.upload.alert.fail,
        icon: "error",
        html: `${err}`,
        timer: 3000,
        heightAuto: false,
        showConfirmButton: false
      })
    });
  };
  const onPointTo = () => {
    setShowLoad(true);
    const params = {
      action: "updateCurrentVersion",
      token
    };
    Object.keys(forms['point_to']).forEach(item => {
      params[item] = forms.point_to[item].value;
    });
    onRequest(params)
    .then(res=> {
      setShowLoad(false);
      SweetAlert.fire({
        title: Doce.point_to.alert.success,
        icon: "success",
        html: `${res.data}`,
        timer: 3000,
        heightAuto: false,
        showConfirmButton: false
      })
    })
    .catch(err=> {
      setShowLoad(false);
      SweetAlert.fire({
        title: Doce.point_to.alert.fail,
        icon: "error",
        html: `${err}`,
        timer: 3000,
        heightAuto: false,
        showConfirmButton: false
      })
    });
  };
  const onCurrent = () => {
    setShowLoad(true);
    const params = {
      action: "getCurrentVersion",
      token
    };
    Object.keys(forms['current']).forEach(item => {
      params[item] = forms.current[item].value;
    });
    onRequest(params).then(res=> {
      setShowLoad(false);
      SweetAlert.fire({
        icon: "success",
        html: `${res.data}`,
        timer: 3000,
        heightAuto: false,
        showConfirmButton: false
      })
    }).catch(err=> {
      setShowLoad(false);
      SweetAlert.fire({
        icon: "error",
        html: `${err}`,
        timer: 3000,
        heightAuto: false,
        showConfirmButton: false
      })
    });
  };
  const setIcon = key => {
    switch (key) {
      case "upload":
        return faCloudUploadAlt;
      case "point_to":
        return faBezierCurve;
      case "current":
        return faQuestionCircle;
      default:
        return;
    }
  }
  const filterForms = type => {
    const activeForm = forms[type];
    let newForm = {};
    switch (type) {
      case "upload":
        Object.keys(activeForm).filter(key => key !== "filename").forEach(key => {
          newForm[key] = forms[type][key];
        });
        return newForm;
      default:
        return activeForm;
    }
  }
  useEffect(() => {
    Cookies.get('user') && setUserName(Cookies.get('user'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="management">
      {showLoad && <Loading/>}
      <div className={showSidebar ? "sidebar open" : "sidebar"}>
        <ul className="lists">
          {sidebars.map(item => <li key={item} className={activeType === item ? "active list_item" : "list_item"}><div onClick={() => navClickHandler(item)}><FontAwesomeIcon className="icon" icon={setIcon(item)}/><span>{Doce[item].name}</span></div></li>)}
          <li key="appStor" className="list_item appStor">
            <a rel="noopener noreferrer" href="https://appstore.suyuncash.com/appStore/" target="_blank">
              <FontAwesomeIcon className="icon" icon={faLink}/>
              <span>appStore</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="content">
        <div className="mark" onClick={() => setShowSidebar(oldState => !oldState)}/>
        <div className="sidebar_btn" onClick={() => setShowSidebar(oldState => !oldState)}>
          <FontAwesomeIcon className="sidebar_btn_icon" icon={faBars}/>
        </div>
        {false && (
          <div className="logOut_blk">
            {userName && <span className="user_name">{`${userName}, `}</span>}
            <button type="button" className="logOut_btn" onClick={logOutHandler}><FontAwesomeIcon className="sidebar_btn_icon" icon={faSignOutAlt}/></button>
          </div>
        )}
        <Form key={activeType} data={{title: activeType, ...filterForms(activeType)}} onSubmit={() => onSubmitHandler(activeType)} onChange={onChangeHandler}/>
      </div>
    </div>
  );
}

export default Management