import { Autocomplete, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChoiceButton from "../components/ChoiceButton";
import HomePageThreeInput from "../components/HomePageThreeInput";
import { AronOptionsAutoComplete, Owner, queryType } from "../common/types";
import HomePageInput from "../components/HomePageSingularInput";
import {
  lineConfig,
  locationConfig,
  merkaziyaConfig,
  roleConfig,
} from "../common/data";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Add } from "@mui/icons-material";
import { nanoid } from "nanoid";
import BreadcrumbTimer from "../../src/components/BreadcrumbTimer/BreadcrumbTimer";

export default function Home() {
  const [line, setLine] = useState<string>("");
  const [chosenButton, setChosenButton] = useState<queryType>(queryType.LINE);
  const [options, setOptions] = useState<AronOptionsAutoComplete[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [alert, setAlert] = useState<boolean>(false)
  /**
   * Auto Search For Aron Locations, For Autocomplete options in Query.
   */
  useEffect(() => {
    window.shaiseAPI
      .getAronsList()
      .then((e: AronOptionsAutoComplete[]) => setOptions(e));
  }, []);

  useEffect(() => {
    window.shaiseAPI.ownerSearch("").then(e => setOwners(e))
  }, [])

  /**
   * Everytime the user moves from button to button, clear the input's value, so there won't be the same value in the `next input`
   */
  useEffect(() => {
    setLine("");
  }, [chosenButton]);

  const navigate = useNavigate();

  /**
   * TODO:
   * Change navigation for each type of enum type
   *
   * This is where  the navigation happens, you chose the the Line query type? cool, i'll take the information with fetch and send it to you with GET / POST request as was accepted with my backend 🥰
   */
  function handleSubmit() {
    if (line.length === 0) return;
    switch (chosenButton) {
      case queryType.LINE: {
        navigate(`line/${line}`);
        break;
      }
      case queryType.LOCATION: {
        const [location, name] = line.split("-");
        //  alert(location + name)
        const aron = options.find((e) => e.location === location)?.id;
        navigate(`aron/${aron}`);
        break;
      }
      case queryType.ROLE: {
        const owner = owners.find(e => e.name === line)
        navigate(`owner/${owner.id}`)
        break;
      }
      case queryType.MERKAZIYA: {
        console.log("MERKAZ", line)
        const [zakif, block, zug] = line.split("-")
        console.log("ZAKUF", zakif, "blOCK", block, 'ZUG', zug)
        window.shaiseAPI.getLineFromTX1(parseInt(zakif), parseInt(block), parseInt(zug))
          .then(e => {
            if (e === "404 phone not found") {
              setAlert(true)
              return;
            }
            navigate(`/line/${e.lineNumber}`)
          }
          )
        break;
      }
    }
  }
  /**
   * Since some inputs needs different things, for example different placeholders, labels, filters, etc.
   * I've created this function so everytime we need a new
   * @returns Configuration of interactivity with the website
   */
  function getConfig() {
    if (chosenButton === queryType.LINE) return lineConfig;
    else if (chosenButton === queryType.ROLE) return roleConfig;
    else if (chosenButton === queryType.LOCATION) return locationConfig;
    else if (chosenButton === queryType.MERKAZIYA) return lineConfig;

    return undefined;
  }
  /**
   * TODO: Delete Mui uses and use different hooks, for autocomplete.
   */
  /**
   * Some Query Types want singular button, some want something more customized, this function is created for exactly that reason,
   * It checks each QueryType, and as was accepted by out Figma Design, would create that exact Input Type.
   * @returns Input Type for Each QueryType
   */
  const inputType = () => {
    const config = getConfig();

    if (config === undefined) {
      console.warn(
        "Config File is undefined, did you create a new QueryType and didnt create a config for it?"
      );
      return;
    }

    if (chosenButton === queryType.MERKAZIYA) {
      return (
        <HomePageThreeInput
          label={merkaziyaConfig.label}
          placeholder={merkaziyaConfig.placeholder}
          setValue={setLine}
          onSubmit={handleSubmit}
          value={line}
          numbersOnly={true}
        />
      );
    } else if (chosenButton === queryType.LOCATION) {
      return (



        <Autocomplete
          autoComplete
          disablePortal
          autoSelect
          openOnFocus
          dir="rtl"
          autoHighlight
          options={options}
          filterOptions={(x) => x.filter((e) => e.location.includes(line))}
          getOptionLabel={(e: AronOptionsAutoComplete) => e.location}
          onChange={(_, v) => setLine(v!.location)}
          renderOption={(props, option) => {
            return (
              <li {...props} key={nanoid()} dir="rtl">
                {option.location + " | " + option.name ?? ""}
              </li>
            );
          }}
          renderInput={(params) => (
            <HomePageInput
              value={line}
              setValue={setLine}
              onSubmit={handleSubmit}
              placeholder={config.placeholder}
              numbersOnly={config.numbersOnly}
              maxLength={config.maxLength}
              inputProp={{ ...params.inputProps }}
              inputRef={params.InputProps.ref}
            />
          )}
        />
      );
    }
    else if (chosenButton === queryType.ROLE) {
      return (
        <Autocomplete
          autoComplete
          disablePortal
          dir="rtl"
          renderOption={(props, option) => {
            return (
              <li {...props} key={nanoid()} dir="rtl">
                {option.name ?? ""}
              </li>
            );
          }}
          autoSelect
          openOnFocus
          autoHighlight
          options={owners}
          filterOptions={(x) => x.filter((e) => e.name.includes(line))}
          getOptionLabel={(e: Owner) => e.name}
          onChange={(_, v) => setLine(v!.name)}
          renderInput={(params) => (
            <HomePageInput
              value={line}
              setValue={setLine}
              onSubmit={handleSubmit}
              placeholder={config.placeholder}
              numbersOnly={config.numbersOnly}
              maxLength={config.maxLength}
              inputProp={{ ...params.inputProps }}
              inputRef={params.InputProps.ref}
            />
          )}
        />
      )
    }
    else {
      return (
        <HomePageInput
          value={line}
          setValue={setLine}
          onSubmit={handleSubmit}
          placeholder={config.placeholder}
          numbersOnly={config.numbersOnly}
          maxLength={config.maxLength}
        />
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#93F491",
        width: "100%",
        height: "100vh",
        direction: "ltr",
      }}
    >
      <IconButton onClick={() => navigate("/404")} style={{ position: "absolute", right: "0.25em", top: "0.25em" }}>
        <AddCircleIcon fontSize="large" />
      </IconButton>
      {alert && <BreadcrumbTimer message="לא נמצא רשומה זו" open={alert} setOpen={setAlert} />
      }<div>
        <button
          style={{
            width: "9vw",
            height: "6vh",
            borderRadius: "33.48px",
            backgroundColor: "FFF",
            fontWeight: "400",
            fontFamily: "Jost",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "4vh",
            border: "0",
            margin: "1vh"
          }}
          onClick={() => navigate("/admin")}
        >
          admin
        </button>
      </div>
      <div
        style={{
          width: "51em",
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            userSelect: "none",
          }}
        >
          <Typography
            fontFamily={"Jost"}
            fontWeight={800}
            color={"#42B240"}
            fontSize={"170px"}
            display={"inline"}
          >
            TA
          </Typography>

          <Typography
            fontFamily={"Jost"}
            fontWeight={800}
            color={"#FFF"}
            fontSize={"170px"}
            display={"inline"}
          >
            SHTI
          </Typography>
          <img
            src="mytashtilogo.png"
            alt="logo"
            style={{ height: "140px", paddingLeft: "1em" }}
            className="selectDisable"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "3em",
            flexDirection: "row-reverse",
          }}
        >
          <ChoiceButton
            title="מספר קו"
            currentId={chosenButton}
            id={queryType.LINE}
            onClick={setChosenButton}
          />
          <ChoiceButton
            title="בעל תפקיד"
            id={queryType.ROLE}
            currentId={chosenButton}
            onClick={setChosenButton}
          />
          <ChoiceButton
            title="ארון"
            currentId={chosenButton}
            id={queryType.LOCATION}
            onClick={setChosenButton}
          />
          <ChoiceButton
            title="מיפוי TX1"
            id={queryType.MERKAZIYA}
            currentId={chosenButton}
            onClick={setChosenButton}
          />
        </div>
        {inputType()}
      </div>
    </div>
  );
}
