import type { MetaFunction } from "@remix-run/node";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import type { Hit } from "instantsearch.js";
import {
  Configure,
  Hits,
  Index,
  InstantSearch,
  InstantSearchSSRProvider,
  InstantSearchServerState,
  Pagination,
  RefinementList,
  SearchBox,
  getServerState,
} from "react-instantsearch";
import { Panel } from "../components/Panel";
import { renderToString } from "react-dom/server";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const searchClient = algoliasearch("latency", "6be0576ff61c053d5f9a3225e2a90f76");

export async function loader() {
  const serverState = await getServerState(<Search />, { renderToString });
  return { serverState };
}

export default function IndexPage() {
  const { serverState } = useLoaderData<typeof loader>();

  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <a href="/">react-instantsearch-app</a>
        </h1>
        <p className="header-subtitle">
          using{" "}
          <a href="https://github.com/algolia/instantsearch/tree/master/packages/react-instantsearch">
            React InstantSearch
          </a>
        </p>
      </header>

      <div className="container">
        <Search serverState={serverState} />
      </div>
    </div>
  );
}

function Search({ serverState }: { serverState?: InstantSearchServerState }) {
  return (
    <InstantSearchSSRProvider {...serverState}>
      <InstantSearch
        searchClient={searchClient}
        indexName="instant_search"
      >
        <Configure hitsPerPage={8} />
        <div className="search-panel">
          <div className="search-panel__filters">
            <Panel header="brand">
              <RefinementList attribute="brand" />
            </Panel>
          </div>

          <div className="search-panel__results">
            <SearchBox placeholder="" className="searchbox" />
            <Hits hitComponent={Hit} />

            <div className="pagination">
              <Pagination />
            </div>
          </div>
        </div>
        <Index indexName="instant_search" indexId="secondary" />
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

type HitProps = {
  hit: Hit;
};

function Hit({ hit }: HitProps) {
  return (
    <article>
      <div>
        <h1>{hit.name}</h1>
        <p>{hit.description}</p>
      </div>
    </article>
  );
}
