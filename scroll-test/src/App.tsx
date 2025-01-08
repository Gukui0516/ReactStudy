import React from "react";
import Page from "./components/Page";
import PageWrapper from "./components/PageWrapper";
const App: React.FC = () => {
  return (
    
    <PageWrapper>
      <Page className="bg-yellow-200">1</Page>
      <Page className="bg-blue-200">2</Page>
      <Page className="bg-pink-200">3</Page>
    </PageWrapper>
  );
};

export default App;
