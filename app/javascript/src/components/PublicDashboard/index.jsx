import React, { useEffect, useState } from "react";

import categoriesApi from "apis/categories";
import quizzesApi from "apis/quizzes";
import EmptyQuizzesListImage from "assets/images/EmptyQuizzesList";
import EmptyState from "components/commons/EmptyState";
import { Filter } from "neetoicons";
import { Button, PageLoader, Input, Select } from "neetoui";
import { useParams, useLocation, useHistory } from "react-router-dom";

import QuizCard from "./QuizCard";

import useDebounce from "../../hooks/useDebounce";

const PublicDashboard = () => {
  const { slug } = useParams();
  const location = useLocation();
  const history = useHistory();

  const urlParams = new URLSearchParams(location.search);
  const queryFromUrl = urlParams.get("q") || "";
  const categoryIdFromUrl = urlParams.get("category_id");
  const categoryNameFromUrl = urlParams.get("category_name");

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(queryFromUrl);
  const [category, setCategory] = useState(
    categoryIdFromUrl && categoryNameFromUrl
      ? { label: categoryNameFromUrl, value: categoryIdFromUrl }
      : null
  );
  const [categories, setCategories] = useState([{ label: "All", value: null }]);
  const [showFilter, setShowFilter] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  const loadCategories = async () => {
    try {
      const data = await categoriesApi.fetch();
      const options = data.map(cat => ({
        label: cat.name,
        value: cat.id,
      }));
      setCategories([{ label: "All", value: null }, ...options]);
    } catch (err) {
      logger.error(err);
    }
  };

  const loadQuizzes = async () => {
    if (!slug) return;

    setLoading(true);
    try {
      const data = await quizzesApi.publicFetch({
        query: debouncedQuery,
        status: "published",
        organization_slug: slug,
        category: category?.value,
        page: 1,
        pageSize: 20,
      });
      setQuizzes(data.quizzes);
    } catch (err) {
      logger.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedQuery) params.set("q", debouncedQuery);

    if (category?.value) {
      params.set("category_name", category.label);
    } else {
      params.delete("category_id");
      params.delete("category_name");
    }

    history.replace({
      pathname: `/publicdashboard/${slug}`,
      search: params.toString(),
    });
  }, [debouncedQuery, category, slug, history]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadQuizzes();
  }, [debouncedQuery, category, slug]);

  if (loading) {
    return (
      <div className="m-auto h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mt-8 flex min-h-screen flex-col bg-gray-50">
      <header className="flex items-center justify-between px-8 py-4 text-white">
        <h1 className="text-2xl font-semibold">
          {quizzes[0]?.organization_name || slug}
        </h1>
        <Button label="Login as admin" to="/login" />
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10">
        <div className="mb-8 flex items-center justify-center">
          <div className="flex w-full max-w-2xl items-center space-x-3">
            <Input
              className="flex-1"
              placeholder="Search for a quiz"
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <div className="relative">
              <Button
                icon={Filter}
                style="tertiary"
                onClick={() => setShowFilter(!showFilter)}
              />
              {showFilter && (
                <div className="absolute right-0 top-10 z-50 w-56 bg-white p-2 shadow-lg">
                  <Select
                    isClearable
                    label="Category"
                    options={categories}
                    value={category}
                    onChange={option => {
                      setCategory(option);
                      setShowFilter(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {quizzes.length === 0 ? (
          <EmptyState
            image={<EmptyQuizzesListImage />}
            title="No quiz found!"
          />
        ) : (
          <section className="grid max-h-[70vh] grid-cols-1 gap-6 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
            {quizzes.map(quiz => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default PublicDashboard;
