import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";
import ReactPaginate from "react-paginate";

export default function App() {
  // зберігаємо пошуковий запит
  const [query, setQuery] = useState("");
  // номер сторінки
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  //React Query для отримання даних
  const { data, isError, isLoading } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query, // запит виконується тільки якщо є пошуковий запит
    keepPreviousData: true, // зберігає попередні дані при зміні сторінки
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1); // скидаємо пагінацію при новому пошуку
  };

  //дані з відповіді
  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  //повідомлення, якщо результатів немає
  if (!isLoading && query && movies.length === 0 && !isError) {
    toast.error("No movies found for your request.");
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {/* Пагінація */}
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isError && <ErrorMessage />}
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading && <Loader />}
      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid
          movies={movies}
          onSelect={(movie) => setSelectedMovie(movie)}
        />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}
