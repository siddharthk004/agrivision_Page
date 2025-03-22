import { useLocation } from "react-router-dom";
import styles from "../pages/searchResult.css";
import Product from "../components/product/index";

const SearchResults = () => {
  const location = useLocation();
  const searchResults = location.state?.results || [];
  const query = location.state?.query || "";

  return (
    <section className={styles.homeProducts}>
      <div className={styles.container}>
        <h2 className={styles.textCenter}>Search Results for: "{query}"</h2>
        <div className={styles.productGrid}>
          {searchResults.length > 0 ? (
            <Product data={searchResults} />
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
