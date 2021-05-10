import React from "react";
import "./Nyt.css";

type NytState = {
  searchTerm: string;
  startDate: string;
  endDate: string;
  pageNumber: number;
  results: [];
  button: boolean;
};

export default class NytApiSearch extends React.Component<{}, NytState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: "",
      startDate: "",
      endDate: "",
      pageNumber: 0,
      results: [],
      button: true,
    };
  }

  FetchResults() {
    const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    const apiKey = "PTzMEc1pFhbOosnyP53bVlGGBJ0Jlaxi";

    let pageNumber = this.state.pageNumber === 0 ? 0 : this.state.pageNumber;

    let url = `${baseURL}?api-key=${apiKey}&page=${this.state.pageNumber}&q=${this.state.searchTerm}`;
    url = this.state.startDate
      ? url + `&begin_date=${this.state.startDate}`
      : url;
    url = this.state.endDate ? url + `&end_date=${this.state.endDate}` : url;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(url);

        this.setState({
          results: data.response.docs,
        });
        // console.log(data.response.docs);
      });
  }

  editSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchTerm: e.currentTarget.value,
    });
  };

  pageDown = () => {
    console.log("down");

    if (this.state.pageNumber > 0) {
      this.setState(
        {
          pageNumber: this.state.pageNumber - 1,
        },
        () => {
          console.log(this.state.pageNumber, "pageNumber");
          this.FetchResults();
        }
      );
    }
  };

  pageUp = () => {
    console.log("up");

    this.setState(
      {
        pageNumber: this.state.pageNumber + 1,
      },
      () => {
        console.log(this.state.pageNumber, "pageNumber");

        this.FetchResults();
      }
    );
  };

  render() {
    return (
      <>
        <div>
          <form
            className="form"
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              this.setState({
                pageNumber: 0,
                button: false,
              });
              this.FetchResults();
            }}
          >
            <span>Enter a single search term (required):</span>
            <input
              type="text"
              name="search"
              value={this.state.searchTerm}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                this.setState({
                  searchTerm: e.currentTarget.value,
                });
              }}
              required
            />
            <br />
            <span>Enter a start date:</span>
            <input
              type="date"
              name="startDate"
              pattern="[0-9]{8}"
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                this.setState({
                  startDate: e.currentTarget.value,
                });
              }}
            />
            <br />
            <span>Enter an end date:</span>
            <input
              type="date"
              name="endDate"
              pattern="[0-9]{8}"
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                this.setState({
                  searchTerm: e.currentTarget.value,
                });
              }}
            />
            <br />
            <button className="submit" type="submit">
              Submit Search
            </button>
          </form>
          <hr />

          <div hidden={this.state.button}>
            <button className="pageDown" onClick={this.pageDown}>
              Previous Page
            </button>
            <button className="pageUp" onClick={this.pageUp}>
              Next Page
            </button>
          </div>

          {this.state.results.map((result: any) => {
            // console.log("result", result);
            return (
              <div>
                <NytDisplay
                  heading={result.abstract}
                  img={result.multimedia[1].url}
                  keys={result.keywords}
                  headline={result.headline.main}
                  web_url={result.web_url}
                />
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export interface IProps {
  heading: string;
  img: string;
  keys: [];
  headline: string;
  web_url: string;
}

const NytDisplay = (props: IProps) => {
  // console.log("PROPS", props.keys);
  return (
    <div className="results">
      <h2 className="heading">{props.headline}</h2>
      <h4 className="abstract">{props.heading}</h4>
      <a href={props.web_url} target="_blank">
        <img
          src={`https://www.nytimes.com/${props.img}`}
          alt="nyt pic"
          className="image"
        />
      </a>
      <ul className="list">
        {props.keys.map((key: any) => {
          // console.log(key);
          // console.log(key.value);
          return <KeyWordDisplay keyword={key.value} />;
        })}
      </ul>
      <hr />
    </div>
  );
};

export interface IKeywords {
  keyword: string;
}

const KeyWordDisplay = (props: IKeywords) => {
  return <li> {props.keyword} </li>;
};
