/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState, useRef } from 'react';
import SetFilter from '@/components/setFilter';
import FilterCard from '@/components/filterCard';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import ClubVip from '@/components/clubVip';
import { GetFilterPackages } from '@/redux/feature/counterApi';
import NoResults from '@/components/states/noResults';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter, useSearchParams } from 'next/navigation';
import SetFilterMobile from '@/components/setFilterMobile';

import { categoryDreamon, getFilters } from '@/redux/feature/counterSlice';

import './styles.scss';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryDreamon());
    dispatch(getFilters());
  }, []);

  const PAGE_LIMIT = 9;

  // TODO: get these values from backend
  const minPrice = 100;
  const maxPrice = 25000;

  const defaultQueryParams = {
    textSearch: '',
    regionIds: [-1],
    countryIds: [-1],
    categoryIds: [-1],
    ideasIds: [-1],
    minPrice,
    maxPrice,
    index: 1,
    offset: PAGE_LIMIT,
  };
  const categories = useSelector((state) => state.counter.categories);

  const [isGettingMoreItems, setIsGettingMoreItems] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilterMobile, setShowFilterMobile] = useState(false);

  // Scroll infinity ->
  let currentPage = useRef(1);
  const setCurrentPage = (p) => {
    currentPage.current = p;
  };
  const getCurrentPage = () => {
    return currentPage.current;
  };

  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const defaultHeaderInfo = {
    img: '[filter]_sliceIconUrban.svg',
    title: 'Todas',
    desc: '',
  };

  const [headerCategory, setHeaderCategory] = useState(defaultHeaderInfo);

  useEffect(() => {
    setCurrentPage(1);
    fetchData();
  }, [
    // searchParams.get('page'),
    searchParams.get('textSearch'),
    searchParams.get('categoryIds'),
    searchParams.get('regionIds'),
    searchParams.get('countryIds'),
    searchParams.get('ideasIds'),
    searchParams.get('minPrice'),
    searchParams.get('maxPrice'),
  ]);

  // Update header
  useEffect(() => {
    const categoriesSelected =
      searchParams.get('categoryIds')?.split(',') || [];
    const firstCategorySelected = categoriesSelected[0] ?? -1;

    if (!firstCategorySelected) {
      setHeaderCategory(defaultHeaderInfo);
    } else {
      const category = categories.find(
        (category) => category.id === +firstCategorySelected
      );
      setHeaderCategory({
        img: category?.headerImage,
        icon: category?.icon,
        title: category?.name,
        desc: category?.shortText,
      });
    }
  }, [categories, searchParams.get('categoryIds')]);

  const fetchData = async () => {
    setIsLoading(true);
    const data = {
      ...defaultQueryParams,
      ...getQueryParamsAsObjectWithArrays(),
      index: getCurrentPage(),
      offset: PAGE_LIMIT,
    };

    if (!data.minPrice) {
      data.minPrice = minPrice;
    }
    if (!data.maxPrice) {
      data.maxPrice = maxPrice;
    }

    const res = await GetFilterPackages(data);
    setPosts(res);
    setIsLoading(false);
  };

  const handleFilterChange = (filterId, itemId, event) => {
    const valueToFilterOut = -1;
    const { checked, id } = event.target;

    const newQueryParams = {
      ...getQueryParamsAsObject(),
    };

    if (!checked || id == valueToFilterOut) {
      delete newQueryParams[filterId];
    } else {
      newQueryParams[filterId] = itemId;
    }

    setCurrentPage(1);
    reloadWithQueryParams(newQueryParams);
  };

  const getMorePost = async () => {
    if (isGettingMoreItems) {
      return;
    }
    setIsGettingMoreItems(true);
    setCurrentPage(getCurrentPage() + 1);

    const updatedRequest = {
      ...defaultQueryParams,
      ...getQueryParamsAsObjectWithArrays(),
      index: getCurrentPage(),
      offset: PAGE_LIMIT,
    };

    if (!updatedRequest.minPrice) {
      updatedRequest.minPrice = minPrice;
    }
    if (!updatedRequest.maxPrice) {
      updatedRequest.maxPrice = maxPrice;
    }

    try {
      const res = await GetFilterPackages(updatedRequest);

      if (res.length === 0) {
        setHasMore(false);
      }

      setPosts((post) => [...post, ...res]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsGettingMoreItems(false);
    }
  };
  // Scroll infinity <-

  const api = process.env.apiImages;
  const imageSlice = `${api}/[filter]_sliceUrban.png`;
  const bgFilterSlice = {
    backgroundImage: `url(${headerCategory?.img ?? imageSlice})`,
  };

  const getQueryParamsAsObject = () => {
    const queryParams = {};
    for (const [key, value] of searchParams) {
      queryParams[key] = value;
    }
    return queryParams;
  };

  const getQueryParamsAsObjectWithArrays = () => {
    const queryParams = {};
    for (const [key, value] of searchParams) {
      if (!queryParams[key]) {
        queryParams[key] = [];
      }
      if (key === 'minPrice' || key === 'maxPrice') {
        queryParams[key] = +value;
      } else {
        queryParams[key] = [...queryParams[key], +value];
      }

      if (key === 'textSearch') {
        queryParams[key] = !!value ? value : '';
        if (!queryParams[key]) {
          delete queryParams[key];
        }
      }
    }
    return queryParams;
  };

  const handleFilterClear = () => {
    setCurrentPage(1);
    reloadWithQueryParams({});
  };

  const handlePriceRangeChange = (minPriceSelected, maxPriceSelected) => {
    const newQueryParams = {
      ...getQueryParamsAsObject(),
      minPrice: minPriceSelected,
      maxPrice: maxPriceSelected,
    };

    if (minPriceSelected === minPrice) {
      delete newQueryParams.minPrice;
    }
    if (maxPriceSelected === maxPrice) {
      delete newQueryParams.maxPrice;
    }

    setCurrentPage(1);
    reloadWithQueryParams(newQueryParams);
  };

  const reloadWithQueryParams = (newQueryParams) => {
    const newQueryParamsString = Object.keys(newQueryParams)
      .map((key) => {
        return `${key}=${newQueryParams[key]}`;
      })
      .join('&');
    const url =
      '/search' + (newQueryParamsString ? `?${newQueryParamsString}` : '');
    router.replace(url, { scroll: false });
  };

  // -> Update list after set favorite package
  const updatePostList = (index, updatedItem) => {
    setPosts((prevPosts) => {
      const newPosts = [...prevPosts];
      newPosts[index] = updatedItem;
      return newPosts;
    });
  };
  // <-

  const handleSearchTextChange = (searchText) => {
    setCurrentPage(1);
    router.push(`/search?textSearch=${searchText}`, {
      scroll: false,
    });
  };

  const handleClearSearchText = () => {
    setCurrentPage(1);
    router.push(`/search`, {
      scroll: false,
    });
  };

  return (
    <main className="filter">
      <div className="sliceFilter" style={bgFilterSlice}>
        <div className="infoSliceFilter">
          {headerCategory.icon && (
            <Image
              src={headerCategory.icon}
              alt="Category Icon"
              width={46.3}
              height={46.3}
            />
          )}
          <h1>{headerCategory?.title}</h1>
          <p style={{textAlign: 'center'}}>{headerCategory?.desc}</p>
        </div>
      </div>
      <div className="setFilter">
        {window.innerWidth > 768 ? (
          <SetFilter
            data={getQueryParamsAsObject()}
            currentPage={getCurrentPage()}
            onFilterChange={handleFilterChange}
            onClearFilter={handleFilterClear}
            onPriceRangeChange={handlePriceRangeChange}
            onSearchTextChange={handleSearchTextChange}
            onSearchTextClear={handleClearSearchText}
            maxPrice={maxPrice}
            minPrice={minPrice}
            priceRange={[
              getQueryParamsAsObject().minPrice || minPrice,
              getQueryParamsAsObject().maxPrice || maxPrice,
            ]}
          />
        ) : (
          <button
            className="btnRadien"
            onClick={() => setShowFilterMobile(true)}
          >
            Filtrar
          </button>
        )}
        {posts?.length <= 0 ? (
          <div className="setFilter_noResults">
            {isLoading ? (
              <CircularProgress />
            ) : (
              <NoResults
                onFilterClear={handleFilterClear}
                currentPage={getCurrentPage()}
              />
            )}
          </div>
        ) : (
          <div className="setFilter_cards">
            <InfiniteScroll
              className="infiniteScroll"
              dataLength={posts?.length || 0}
              next={getMorePost}
              hasMore={hasMore}
              loader={<CircularProgress />}
              endMessage={<></>}
              style={{ overflow: 'hidden' }}
            >
              {posts?.map((item, index) => (
                <FilterCard
                  key={index}
                  img={item?.image}
                  nombre={item?.name}
                  destino={item?.locationName}
                  personas={item?.paxNumber}
                  Price={item?.price}
                  // like={(item.userFavorites || [])[0]?.id}
                  like={item?.isFavorite}
                  id={item?.id}
                  quantity={item?.quantity}
                  onUpdatePost={(updatedItem) =>
                    updatePostList(index, updatedItem)
                  }
                />
              ))}
            </InfiniteScroll>
          </div>
        )}
      </div>
      {showFilterMobile && (
        <SetFilterMobile
          data={getQueryParamsAsObject()}
          currentPage={getCurrentPage()}
          onFilterChange={handleFilterChange}
          onClearFilter={handleFilterClear}
          onPriceRangeChange={handlePriceRangeChange}
          onSearchTextChange={handleSearchTextChange}
          onSearchTextClear={handleClearSearchText}
          maxPrice={maxPrice}
          minPrice={minPrice}
          priceRange={[
            getQueryParamsAsObject().minPrice || minPrice,
            getQueryParamsAsObject().maxPrice || maxPrice,
          ]}
          setShowFilterMobile={setShowFilterMobile}
        />
      )}
      <ClubVip />
    </main>
  );
}
