export default function TestEnv() {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Testando variáveis do .env.local</h1>
        <p>SPACE ID: {process.env.CONTENTFUL_SPACE_ID}</p>
        <p>ACCESS TOKEN: {process.env.CONTENTFUL_ACCESS_TOKEN}</p>
        <p>ENVIRONMENT: {process.env.CONTENTFUL_ENVIRONMENT}</p>
      </div>
    );
  }
  