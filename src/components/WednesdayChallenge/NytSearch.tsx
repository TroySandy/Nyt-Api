import React from "react";
import './Nyt.css'

type NytState = {
  searchTerm: string;
  startDate: string;
  endDate: string;
  pageNumber: number;
  results: [];
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
    };
  }

  FetchResults() {
    const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    const apiKey = "vr8WVzJQYplm06pmA6HRrEQ6uJmJlAtz";

    let url = `${baseURL}?api-key=${apiKey}&page=${this.state.pageNumber}&q=${this.state.searchTerm}`;
    url = this.state.startDate
      ? url + `&begin_date=${this.state.startDate}`
      : url;
    url = this.state.endDate ? url + `&end_date=${this.state.endDate}` : url;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          results: data.response.docs,
        });
        console.log(data.response.docs);
      });
  }

  editSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchTerm: e.currentTarget.value,
    });
  };

    changePageNumber = (
      e: React.ChangeEventHandler<HTMLInputElement>,
      direction: string
    ) => {
      if (direction === "down") {
        if (this.state.pageNumber > 0) {
          this.setState({
            pageNumber: this.state.pageNumber - 1,
          });
          this.FetchResults();
        }
      }
      if (direction === "up") {
        this.setState({
          pageNumber: this.state.pageNumber + 1,
        });
        this.FetchResults();
      }
    };

  render() {
    return (
      <>
        <div>
          <form
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              this.setState({
                pageNumber: 0,
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
          {this.state.results.map((result: any) => {
            console.log("result", result);
            return (
              <div>
                <NytDisplay
                  heading={result.abstract}
                  img={result.multimedia[14].url}
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
  console.log("PROPS", props.keys);
  return (
    <div>
      <h2>{props.headline}</h2>
      <h4>{props.heading}</h4>
      <a href={props.web_url} target='_blank'>
        <img src={`https://www.nytimes.com/${props.img}`} alt="nyt pic" />
      </a>
      {props.keys.map((key: any) => {
        console.log(key);
        //   console.log(key.value);
        return <p>{key.value}</p>;
      })}
      <hr/>
    </div>
  );
};
