/** Dependencies */
import { ApiWrapper } from '@moon/types';
import * as Types from './types';

/**
 * @brief TMDB API Wrapper
 * @description A wrapper for the TMDB API that simplifies making requests.
 * @example
 * const tmdb = new TMDB('your_api_key');
 * const popularMovies = await tmdb.getPopularMovies();
 */
export class TMDB extends ApiWrapper {
  /**
   * @brief TMDB API constructor
   * @description Initializes the TMDB API wrapper with the provided API key.
   * @param apiKey - The API key for authenticating requests to the TMDB API.
   * @example
   * const tmdb = new TMDB('your_api_key');
   */
  constructor(apiKey: string) {
    // Call the parent class constructor with the TMDB API configuration
    super({
      baseUrl: 'https://api.themoviedb.org/3',
      defaultHeaders: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${apiKey}`
      }
    });
  }

  /**
   * @brief Search for a movie
   * @description This method allows you to search for a movie by its title.
   * @param options - Options for fetching popular movies.
   * @returns A promise that resolves to a list of popular movies.
   * @example
   * const movies = await tmdb.searchMovie({ query: 'Inception', year: 2010 });
   */
  public async searchMovie(options: Types.TMDBMovieSearchOptions): Promise<Types.TMDBSearch<Types.TMDBMovie>> {
    return this.get<Types.TMDBSearch<Types.TMDBMovie>>('/search/movie', { params: options });
  }

  /**
   * @brief Search for a company
   * @description This method allows you to search for a company by its name.
   * @param options - Options for fetching company details.
   * @returns A promise that resolves to a list of companies.
   * @example
   * const companies = await tmdb.searchCompany({ query: 'Warner Bros' });
   */
  async searchCompany(options: Types.TMDBSearchOptions): Promise<Types.TMDBSearch<Types.TMDBCompany>> {
    return await this.get<Types.TMDBSearch<Types.TMDBCompany>>('/search/company', { params: options });
  }

  /**
   * @brief Search for a collection
   * @description This method allows you to search for a collection by its name.
   * @param options - Options for fetching collection details.
   * @returns A promise that resolves to a list of collections.
   * @example
   * const collections = await tmdb.searchCollection({ query: 'The Lord of the Rings' });
   */
  async searchCollection(options: Types.TMDBSearchOptions): Promise<Types.TMDBSearch<Types.TMDBCollection>> {
    return await this.get<Types.TMDBSearch<Types.TMDBCollection>>('/search/collection', { params: options });
  }

  /**
   * @brief Search for a keyword
   * @description This method allows you to search for a keyword by its name.
   * @param options - Options for fetching keyword details.
   * @returns A promise that resolves to a list of keywords.
   * @example
   * const keywords = await tmdb.searchKeyword({ query: 'Inception' });
   */
  async searchKeyword(options: Types.TMDBSearchOptions): Promise<Types.TMDBSearch<{ id: string; name: string }>> {
    return await this.get<Types.TMDBSearch<{ id: string; name: string }>>('/search/keyword', { params: options });
  }

  /**
   * @brief Search for a person
   * @description This method allows you to search for a person by their name.
   * @param options - Options for fetching person details.
   * @returns A promise that resolves to a list of people.
   * @example
   * const people = await tmdb.searchPerson({ query: 'Leonardo DiCaprio' });
   */
  async searchPerson(options: Types.TMDBPeopleSearchOptions): Promise<Types.TMDBSearch<Types.TMDBPerson>> {
    return await this.get<Types.TMDBSearch<Types.TMDBPerson>>('/search/person', { params: options });
  }

  /**
   * @brief Search for a TV show
   * @description This method allows you to search for a TV show by its name.
   * @param options - Options for fetching TV show details.
   * @returns A promise that resolves to a list of TV shows.
   * @example
   * const tvShows = await tmdb.searchTvShow({ query: 'Breaking Bad' });
   */
  async searchTvShow(options: Types.TMDBTvSearchOptions): Promise<Types.TMDBSearch<Types.TMDBTV>> {
    return await this.get<Types.TMDBSearch<Types.TMDBTV>>('/search/tv', { params: options });
  }

  /**
   * @brief Search for multiple types of media
   * @description This method allows you to search for multiple types of media (movies, TV shows, people, etc.) by a query.
   * @param options - Options for fetching multi search results.
   * @returns A promise that resolves to a list of multi search results.
   * @example
   * const results = await tmdb.searchMulti({ query: 'Inception' });
   */
  async searchMulti(options: Types.TMDBMultiSearchOptions): Promise<Types.TMDBSearch<Types.TMDBMultiSearchResult>> {
    return await this.get<Types.TMDBSearch<Types.TMDBMultiSearchResult>>('/search/multi', { params: options });
  }

  /**
   * @brief Get account details
   * @description This method retrieves the details of the authenticated user's account.
   * @returns A promise that resolves to the account details.
   * @example
   * const accountDetails = await tmdb.getAccountDetails();
   */
  async getAccountDetails(): Promise<Types.TMDBAccountDetails> {
    return await this.get<Types.TMDBAccountDetails>('/account');
  }

  /**
   * @brief Get movie certifications
   * @description This method retrieves the list of movie certifications.
   * @returns A promise that resolves to the movie certifications.
   * @example
   * const movieCertifications = await tmdb.getMovieCertifications();
   */
  async getMovieCertifications(): Promise<Types.TMDBCertifications> {
    return await this.get<Types.TMDBCertifications>('/certification/movie/list');
  }

  /**
   * @brief Get TV show certifications
   * @description This method retrieves the list of TV show certifications.
   * @returns A promise that resolves to the TV show certifications.
   * @example
   * const tvShowCertifications = await tmdb.getTvShowCertifications();
   */
  async getTvShowCertifications(): Promise<Types.TMDBCertifications> {
    return await this.get<Types.TMDBCertifications>('/certification/tv/list');
  }

  /**
   * @brief Get movie changes
   * @description This method retrieves the list of changes for movies.
   * @param options - Options for fetching movie changes.
   * @returns A promise that resolves to the movie changes.
   * @example
   * const movieChanges = await tmdb.getMoviesChanges();
   */
  async getMoviesChanges(options?: Types.TMDBChangeOption): Promise<Types.TMDBMediaChanges> {
    return await this.get<Types.TMDBMediaChanges>('/movie/changes', { params: options });
  }

  /**
   * @brief Get TV show changes
   * @description This method retrieves the list of changes for TV shows.
   * @param options - Options for fetching TV show changes.
   * @returns A promise that resolves to the TV show changes.
   * @example
   * const tvShowChanges = await tmdb.getTvShowsChanges();
   */
  async getTvShowsChanges(options?: Types.TMDBChangeOption): Promise<Types.TMDBMediaChanges> {
    return await this.get<Types.TMDBMediaChanges>('/tv/changes', { params: options });
  }

  /**
   * @brief Get person changes
   * @description This method retrieves the list of changes for people.
   * @param options - Options for fetching person changes.
   * @returns A promise that resolves to the person changes.
   * @example
   * const personChanges = await tmdb.getPeopleChanges();
   */
  async getPeopleChanges(options?: Types.TMDBChangeOption): Promise<Types.TMDBMediaChanges> {
    return await this.get<Types.TMDBMediaChanges>('/person/changes', { params: options });
  }

  /**
   * @brief Get trending media
   * @description This method retrieves the list of trending media.
   * @param mediaType - The type of media to retrieve (e.g., movie, tv, person).
   * @param timeWindow - The time window for the trending results (e.g., day, week).
   * @param options - Additional options for fetching trending media.
   * @returns A promise that resolves to the trending media results.
   * @example
   * const trendingMovies = await tmdb.getTrending('movie', 'day');
   */
  async getTrending<T extends Types.TMDBTrendingMediaType>(
    mediaType: T,
    timeWindow: Types.TMDBTimeWindow,
    options?: Types.TMDBLanguageOption & Types.TMDBPageOption
  ): Promise<Types.TMDBTrendingResults<T>> {
    return await this.get<Types.TMDBTrendingResults<T>>(`/trending/${mediaType}/${timeWindow}`, { params: options });
  }

  /**
   * @brief Get review details
   * @description This method retrieves the details of a specific review.
   * @param id - The ID of the review to retrieve.
   * @returns A promise that resolves to the review details.
   * @example
   * const reviewDetails = await tmdb.getReviewDetails('review_id');
   */
  async getReviewDetails(id: string): Promise<Types.TMDBReviewDetails> {
    return await this.get<Types.TMDBReviewDetails>(`/review/${id}`);
  }

  /**
   * @brief Get network details
   * @description This method retrieves the details of a specific network.
   * @param id - The ID of the network to retrieve.
   * @returns A promise that resolves to the network details.
   * @example
   * const networkDetails = await tmdb.getNetworkDetails(1);
   */
  async getNetworkDetails(id: number): Promise<Types.TMDBNetworkDetails> {
    return await this.get<Types.TMDBNetworkDetails>(`/network/${id}`);
  }

  /**
   * @brief Get network alternative names
   * @description This method retrieves the alternative names for a specific network.
   * @param id - The ID of the network to retrieve alternative names for.
   * @returns A promise that resolves to the network alternative names.
   * @example
   * const networkAlternativeNames = await tmdb.getNetworkAlternativeNames(1);
   */
  async getNetworkAlternativeNames(id: number): Promise<Types.TMDBAlternativeNames> {
    return await this.get<Types.TMDBAlternativeNames>(`/network/${id}/alternative_names`);
  }

  /**
   * @brief Get network images
   * @description This method retrieves the images for a specific network.
   * @param id - The ID of the network to retrieve images for.
   * @returns A promise that resolves to the network images.
   * @example
   * const networkImages = await tmdb.getNetworkImages(1);
   */
  async getNetworkImages(id: number): Promise<Types.TMDBNetworkImages> {
    return await this.get<Types.TMDBNetworkImages>(`/network/${id}/images`);
  }

  /**
   * @brief Get watch provider regions
   * @description This method retrieves the list of regions where watch providers are available.
   * @param options - Additional options for fetching watch provider regions.
   * @returns A promise that resolves to the watch provider regions.
   * @example
   * const watchProviderRegions = await tmdb.getWatchProviderRegions();
   */
  async getWatchProviderRegions(options?: Types.TMDBLanguageOption): Promise<Types.TMDBRegionResult> {
    return await this.get<Types.TMDBRegionResult>('/watch/providers/regions', { params: options });
  }

  /**
   * @brief Get movie providers
   * @description This method retrieves the list of watch providers for movies.
   * @param options - Additional options for fetching movie providers.
   * @returns A promise that resolves to the movie providers.
   * @example
   * const movieProviders = await tmdb.getMovieProviders();
   */
  async getMovieProviders(options?: Types.TMDBProviderOptions): Promise<Types.TMDBWatchProviderResult> {
    return await this.get<Types.TMDBWatchProviderResult>('/watch/providers/movie', { params: options });
  }

  /**
   * @brief Get TV show providers
   * @description This method retrieves the list of watch providers for TV shows.
   * @param options - Additional options for fetching TV show providers.
   * @returns A promise that resolves to the TV show providers.
   * @example
   * const tvShowProviders = await tmdb.getTvShowProviders();
   */
  async getTvShowProviders(options?: Types.TMDBProviderOptions): Promise<Types.TMDBWatchProviderResult> {
    return await this.get<Types.TMDBWatchProviderResult>('/watch/providers/tv', { params: options });
  }

  /**
   * @brief Get collection details
   * @description This method retrieves the details for a specific collection.
   * @param id - The ID of the collection to retrieve details for.
   * @param options - Additional options for fetching collection details.
   * @returns A promise that resolves to the collection details.
   * @example
   * const collectionDetails = await tmdb.getCollectionDetails(1);
   */
  async getCollectionDetails(id: number, options?: Types.TMDBLanguageOption): Promise<Types.TMDBCollectionDetails> {
    return await this.get<Types.TMDBCollectionDetails>(`/collection/${id}`, { params: options });
  }

  /**
   * @brief Get collection images
   * @description This method retrieves the images for a specific collection.
   * @param id - The ID of the collection to retrieve images for.
   * @param options - Additional options for fetching collection images.
   * @returns A promise that resolves to the collection images.
   * @example
   * const collectionImages = await tmdb.getCollectionImages(1);
   */
  async getCollectionImages(
    id: number,
    options?: Types.TMDBCollectionImageOptions
  ): Promise<Types.TMDBImageCollection> {
    const computedOptions = {
      include_image_language: options?.include_image_language?.join(','),
      language: options?.language
    };
    return await this.get<Types.TMDBImageCollection>(`/collection/${id}/images`, { params: computedOptions });
  }

  /**
   * @brief Get collection translations
   * @description This method retrieves the translations for a specific collection.
   * @param id - The ID of the collection to retrieve translations for.
   * @param options - Additional options for fetching collection translations.
   * @returns A promise that resolves to the collection translations.
   * @example
   * const collectionTranslations = await tmdb.getCollectionTranslations(1);
   */
  async getCollectionTranslations(id: number, options?: Types.TMDBLanguageOption): Promise<Types.TMDBTranslation> {
    return await this.get<Types.TMDBTranslation>(`/collection/${id}/translations`, { params: options });
  }

  /**
   * @brief Get company details
   * @description This method retrieves the details for a specific company.
   * @param id - The ID of the company to retrieve details for.
   * @returns A promise that resolves to the company details.
   * @example
   * const companyDetails = await tmdb.getCompanyDetails(1);
   */
  async getCompanyDetails(id: number): Promise<Types.TMDBCompanyDetails> {
    return await this.get<Types.TMDBCompanyDetails>(`/company/${id}`);
  }

  /**
   * @brief Get company alternative names
   * @description This method retrieves the alternative names for a specific company.
   * @param id - The ID of the company to retrieve alternative names for.
   * @returns A promise that resolves to the company alternative names.
   * @example
   * const companyAlternativeNames = await tmdb.getCompanyAlternativeNames(1);
   */
  async getCompanyAlternativeNames(id: number): Promise<Types.TMDBAlternativeNames> {
    return await this.get<Types.TMDBAlternativeNames>(`/company/${id}/alternative_names`);
  }

  /**
   * @brief Get company images
   * @description This method retrieves the images for a specific company.
   * @param id - The ID of the company to retrieve images for.
   * @returns A promise that resolves to the company images.
   * @example
   * const companyImages = await tmdb.getCompanyImages(1);
   */
  async getCompanyImages(id: number): Promise<Types.TMDBCompanyImages> {
    return await this.get<Types.TMDBCompanyImages>(`/company/${id}/images`);
  }

  /**
   * @brief Get API configuration
   * @description This method retrieves the configuration information for the TMDB API.
   * @returns A promise that resolves to the API configuration.
   * @example
   * const apiConfiguration = await tmdb.getApiConfiguration();
   */
  async getApiConfiguration(): Promise<Types.TMDBConfiguration> {
    return await this.get<Types.TMDBConfiguration>('/configuration');
  }

  /**
   * @brief Get countries
   * @description This method retrieves the list of countries supported by the TMDB API.
   * @returns A promise that resolves to the list of countries.
   * @example
   * const countries = await tmdb.getCountries();
   */
  async getCountries(): Promise<Types.TMDBCountryConfiguration[]> {
    return await this.get<Types.TMDBCountryConfiguration[]>('/configuration/countries');
  }

  /**
   * @brief Get languages
   * @description This method retrieves the list of languages supported by the TMDB API.
   * @returns A promise that resolves to the list of languages.
   * @example
   * const languages = await tmdb.getLanguages();
   */
  async getLanguages(): Promise<Types.TMDBLanguageConfiguration[]> {
    return await this.get<Types.TMDBLanguageConfiguration[]>('/configuration/languages');
  }

  /**
   * @brief Get jobs
   * @description This method retrieves the list of jobs supported by the TMDB API.
   * @returns A promise that resolves to the list of jobs.
   * @example
   * const jobs = await tmdb.getJobs();
   */
  async getJobs(): Promise<Types.TMDBJobConfiguration[]> {
    return await this.get<Types.TMDBJobConfiguration[]>('/configuration/jobs');
  }

  /**
   * @brief Get primary translations
   * @description This method retrieves the list of primary translations supported by the TMDB API.
   * @returns A promise that resolves to the list of primary translations.
   * @example
   * const primaryTranslations = await tmdb.getPrimaryTranslations();
   */
  async getPrimaryTranslations(): Promise<string[]> {
    return await this.get<string[]>('/configuration/primary_translations');
  }

  /**
   * @brief Get timezones
   * @description This method retrieves the list of timezones supported by the TMDB API.
   * @returns A promise that resolves to the list of timezones.
   * @example
   * const timezones = await tmdb.getTimezones();
   */
  async getTimezones(): Promise<Types.TMDBTimezoneConfiguration[]> {
    return await this.get<Types.TMDBTimezoneConfiguration[]>('/configuration/timezones');
  }

  /**
   * @brief Get credits
   * @description This method retrieves the credits for a specific movie or TV show.
   * @param id - The ID of the movie or TV show to retrieve credits for.
   * @returns A promise that resolves to the credits information.
   * @example
   * const credits = await tmdb.getCredits(1);
   */
  async getCredits(id: number): Promise<Types.TMDBCreditResponse> {
    return await this.get<Types.TMDBCreditResponse>(`/credit/${id}`);
  }

  /**
   * @brief Discover movies
   * @description This method allows you to discover movies based on various filtering options.
   * @param options - Options for filtering and discovering movies.
   * @returns A promise that resolves to the discovered movies.
   * @example
   * const discoveredMovies = await tmdb.discoverMovies({ year: 2023, with_genres: '28' });
   */
  async discoverMovies(options?: Types.TMDBMovieQueryOptions): Promise<Types.TMDBMovieDiscoverResult> {
    return await this.get<Types.TMDBMovieDiscoverResult>('/discover/movie', { params: options });
  }

  /**
   * @brief Discover TV shows
   * @description This method allows you to discover TV shows based on various filtering options.
   * @param options - Options for filtering and discovering TV shows.
   * @returns A promise that resolves to the discovered TV shows.
   * @example
   * const discoveredTvShows = await tmdb.discoverTvShows({ first_air_date_year: 2023 });
   */
  async discoverTvShows(options?: Types.TMDBTvShowQueryOptions): Promise<Types.TMDBTvShowDiscoverResult> {
    return await this.get<Types.TMDBTvShowDiscoverResult>('/discover/tv', { params: options });
  }

  /**
   * @brief Find by external ID
   * @description This method allows you to find movies, TV shows, and people by external IDs from other databases.
   * @param id - The external ID to search for.
   * @param options - Options specifying the external source of the ID.
   * @returns A promise that resolves to the find results.
   * @example
   * const findResults = await tmdb.findByExternalId('tt1375666', { external_source: 'imdb_id' });
   */
  async findByExternalId(id: string, options: Types.TMDBExternalIdOptions): Promise<Types.TMDBFindResult> {
    return await this.get<Types.TMDBFindResult>(`/find/${id}`, { params: options });
  }

  /**
   * @brief Get movie genres
   * @description This method retrieves the list of official genres for movies.
   * @param options - Additional options for fetching movie genres.
   * @returns A promise that resolves to the list of movie genres.
   * @example
   * const movieGenres = await tmdb.getMovieGenres();
   */
  async getMovieGenres(options?: Types.TMDBLanguageOption): Promise<Types.TMDBGenres> {
    return await this.get<Types.TMDBGenres>('/genre/movie/list', { params: options });
  }

  /**
   * @brief Get TV show genres
   * @description This method retrieves the list of official genres for TV shows.
   * @param options - Additional options for fetching TV show genres.
   * @returns A promise that resolves to the list of TV show genres.
   * @example
   * const tvShowGenres = await tmdb.getTvShowGenres();
   */
  async getTvShowGenres(options?: Types.TMDBLanguageOption): Promise<Types.TMDBGenres> {
    return await this.get<Types.TMDBGenres>('/genre/tv/list', { params: options });
  }

  /**
   * @brief Get keyword details
   * @description This method retrieves the details of a specific keyword.
   * @param id - The ID of the keyword to retrieve details for.
   * @returns A promise that resolves to the keyword details.
   * @example
   * const keywordDetails = await tmdb.getKeywordDetails(123);
   */
  async getKeywordDetails(id: number): Promise<Types.TMDBKeyword> {
    return await this.get<Types.TMDBKeyword>(`/keyword/${id}`);
  }

  /**
   * @brief Get person details
   * @description This method retrieves the details of a specific person, with optional append to response.
   * @param id - The ID of the person to retrieve details for.
   * @param appendToResponse - Additional data to append to the response.
   * @param language - The language for the response.
   * @returns A promise that resolves to the person details.
   * @example
   * const personDetails = await tmdb.getPersonDetails(287, ['movie_credits', 'tv_credits']);
   */
  async getPersonDetails<T extends Types.TMDBAppendToResponsePersonKey[] | undefined>(
    id: number,
    appendToResponse?: T,
    language?: string
  ) {
    const options = {
      append_to_response: appendToResponse ? appendToResponse.join(',') : undefined,
      language: language
    };
    return await this.get<Types.TMDBAppendToResponse<Types.TMDBPersonDetails, T, 'person'>>(`/person/${id}`, {
      params: options
    });
  }

  /**
   * @brief Get person changes
   * @description This method retrieves the changes for a specific person.
   * @param id - The ID of the person to retrieve changes for.
   * @param options - Options for fetching person changes.
   * @returns A promise that resolves to the person changes.
   * @example
   * const personChanges = await tmdb.getPersonChanges(287);
   */
  async getPersonChanges(
    id: number,
    options?: Types.TMDBChangeOption
  ): Promise<Types.TMDBChanges<Types.TMDBPersonChangeValue>> {
    return await this.get<Types.TMDBChanges<Types.TMDBPersonChangeValue>>(`/person/${id}/changes`, { params: options });
  }

  /**
   * @brief Get person movie credits
   * @description This method retrieves the movie credits for a specific person.
   * @param id - The ID of the person to retrieve movie credits for.
   * @param options - Additional options for fetching movie credits.
   * @returns A promise that resolves to the person's movie credits.
   * @example
   * const movieCredits = await tmdb.getPersonMovieCredits(287);
   */
  async getPersonMovieCredits(id: number, options?: Types.TMDBLanguageOption): Promise<Types.TMDBPersonMovieCredit> {
    return await this.get<Types.TMDBPersonMovieCredit>(`/person/${id}/movie_credits`, { params: options });
  }

  /**
   * @brief Get person TV show credits
   * @description This method retrieves the TV show credits for a specific person.
   * @param id - The ID of the person to retrieve TV show credits for.
   * @param options - Additional options for fetching TV show credits.
   * @returns A promise that resolves to the person's TV show credits.
   * @example
   * const tvCredits = await tmdb.getPersonTvShowCredits(287);
   */
  async getPersonTvShowCredits(id: number, options?: Types.TMDBLanguageOption): Promise<Types.TMDBPersonTvShowCredit> {
    return await this.get<Types.TMDBPersonTvShowCredit>(`/person/${id}/tv_credits`, { params: options });
  }

  /**
   * @brief Get person combined credits
   * @description This method retrieves the combined movie and TV show credits for a specific person.
   * @param id - The ID of the person to retrieve combined credits for.
   * @param options - Additional options for fetching combined credits.
   * @returns A promise that resolves to the person's combined credits.
   * @example
   * const combinedCredits = await tmdb.getPersonCombinedCredits(287);
   */
  async getPersonCombinedCredits(
    id: number,
    options?: Types.TMDBLanguageOption
  ): Promise<Types.TMDBPersonCombinedCredits> {
    return await this.get<Types.TMDBPersonCombinedCredits>(`/person/${id}/combined_credits`, { params: options });
  }

  /**
   * @brief Get person external IDs
   * @description This method retrieves the external IDs for a specific person.
   * @param id - The ID of the person to retrieve external IDs for.
   * @returns A promise that resolves to the person's external IDs.
   * @example
   * const externalIds = await tmdb.getPersonExternalId(287);
   */
  async getPersonExternalId(id: number): Promise<Types.TMDBExternalIds> {
    return await this.get<Types.TMDBExternalIds>(`/person/${id}/external_ids`);
  }

  /**
   * @brief Get person images
   * @description This method retrieves the images for a specific person.
   * @param id - The ID of the person to retrieve images for.
   * @returns A promise that resolves to the person's images.
   * @example
   * const personImages = await tmdb.getPersonImages(287);
   */
  async getPersonImages(id: number): Promise<Types.TMDBPeopleImages> {
    return await this.get<Types.TMDBPeopleImages>(`/person/${id}/images`);
  }

  /**
   * @brief Get person translations
   * @description This method retrieves the translations for a specific person.
   * @param id - The ID of the person to retrieve translations for.
   * @returns A promise that resolves to the person's translations.
   * @example
   * const personTranslations = await tmdb.getPersonTranslations(287);
   */
  async getPersonTranslations(id: number): Promise<Types.TMDBPersonTranslations> {
    return await this.get<Types.TMDBPersonTranslations>(`/person/${id}/translations`);
  }

  /**
   * @brief Get latest person
   * @description This method retrieves the most recently added person to TMDB.
   * @returns A promise that resolves to the latest person details.
   * @example
   * const latestPerson = await tmdb.getPersonLatest();
   */
  async getPersonLatest(): Promise<Types.TMDBPersonDetails> {
    return await this.get<Types.TMDBPersonDetails>('/person/latest');
  }

  /**
   * @brief Get popular people
   * @description This method retrieves the list of popular people on TMDB.
   * @param options - Additional options for fetching popular people.
   * @returns A promise that resolves to the list of popular people.
   * @example
   * const popularPeople = await tmdb.getPersonPopular({ page: 1 });
   */
  async getPersonPopular(options?: Types.TMDBLanguageOption & Types.TMDBPageOption): Promise<Types.TMDBPopularPeople> {
    return await this.get<Types.TMDBPopularPeople>('/person/popular', { params: options });
  }

  /**
   * @brief Get movie details
   * @description This method retrieves the details of a specific movie, with optional append to response.
   * @param id - The ID of the movie to retrieve details for.
   * @param appendToResponse - Additional data to append to the response.
   * @param language - The language for the response.
   * @returns A promise that resolves to the movie details.
   * @example
   * const movieDetails = await tmdb.getMovieDetails(550, ['credits', 'videos']);
   */
  async getMovieDetails<T extends Types.TMDBAppendToResponseMovieKey[] | undefined>(
    id: number,
    appendToResponse?: T,
    language?: Types.TMDBAvailableLanguage
  ) {
    const options = {
      append_to_response: appendToResponse ? appendToResponse.join(',') : undefined,
      language: language
    };

    return await this.get<Types.TMDBAppendToResponse<Types.TMDBMovieDetails, T, 'movie'>>(`/movie/${id}`, {
      params: options
    });
  }

  /**
   * @brief Get movie alternative titles
   * @description This method retrieves the alternative titles for a specific movie.
   * @param id - The ID of the movie to retrieve alternative titles for.
   * @returns A promise that resolves to the movie's alternative titles.
   * @example
   * const alternativeTitles = await tmdb.getMovieAlternativeTitles(550);
   */
  async getMovieAlternativeTitles(id: number): Promise<Types.TMDBAlternativeTitles> {
    return await this.get<Types.TMDBAlternativeTitles>(`/movie/${id}/alternative_titles`);
  }

  /**
   * @brief Get movie changes
   * @description This method retrieves the changes for a specific movie.
   * @param id - The ID of the movie to retrieve changes for.
   * @param options - Options for fetching movie changes.
   * @returns A promise that resolves to the movie changes.
   * @example
   * const movieChanges = await tmdb.getMovieChanges(550);
   */
  async getMovieChanges(
    id: number,
    options?: Types.TMDBChangeOption
  ): Promise<Types.TMDBChanges<Types.TMDBMovieChangeValue>> {
    return await this.get<Types.TMDBChanges<Types.TMDBMovieChangeValue>>(`/movie/${id}/changes`, { params: options });
  }

  /**
   * @brief Get movie credits
   * @description This method retrieves the cast and crew credits for a specific movie.
   * @param id - The ID of the movie to retrieve credits for.
   * @param options - Additional options for fetching movie credits.
   * @returns A promise that resolves to the movie credits.
   * @example
   * const movieCredits = await tmdb.getMovieCredits(550);
   */
  async getMovieCredits(id: number, options?: Types.TMDBLanguageOption): Promise<Types.TMDBCredits> {
    return await this.get<Types.TMDBCredits>(`/movie/${id}/credits`, { params: options });
  }

  /**
   * @brief Get movie external IDs
   * @description This method retrieves the external IDs for a specific movie.
   * @param id - The ID of the movie to retrieve external IDs for.
   * @returns A promise that resolves to the movie's external IDs.
   * @example
   * const externalIds = await tmdb.getMovieExternalIds(550);
   */
  async getMovieExternalIds(id: number): Promise<Types.TMDBExternalIds> {
    return await this.get<Types.TMDBExternalIds>(`/movie/${id}/external_ids`);
  }

  /**
   * @brief Get movie images
   * @description This method retrieves the images for a specific movie.
   * @param id - The ID of the movie to retrieve images for.
   * @param options - Additional options for fetching movie images.
   * @returns A promise that resolves to the movie images.
   * @example
   * const movieImages = await tmdb.getMovieImages(550);
   */
  async getMovieImages(id: number, options?: Types.TMDBMoviesImageSearchOptions): Promise<Types.TMDBImages> {
    const computedOptions = {
      include_image_language: options?.include_image_language?.join(','),
      language: options?.language
    };
    return await this.get<Types.TMDBImages>(`/movie/${id}/images`, { params: computedOptions });
  }

  /**
   * @brief Get movie keywords
   * @description This method retrieves the keywords associated with a specific movie.
   * @param id - The ID of the movie to retrieve keywords for.
   * @returns A promise that resolves to the movie keywords.
   * @example
   * const movieKeywords = await tmdb.getMovieKeywords(550);
   */
  async getMovieKeywords(id: number): Promise<Types.TMDBKeywords> {
    return await this.get<Types.TMDBKeywords>(`/movie/${id}/keywords`);
  }

  /**
   * @brief Get movie lists
   * @description This method retrieves the lists that a movie belongs to.
   * @param id - The ID of the movie to retrieve lists for.
   * @param options - Additional options for fetching movie lists.
   * @returns A promise that resolves to the movie lists.
   * @example
   * const movieLists = await tmdb.getMovieLists(550);
   */
  async getMovieLists(
    id: number,
    options?: Types.TMDBLanguageOption & Types.TMDBPageOption
  ): Promise<Types.TMDBMovieLists> {
    return await this.get<Types.TMDBMovieLists>(`/movie/${id}/lists`, { params: options });
  }

  /**
   * @brief Get movie recommendations
   * @description This method retrieves a list of recommended movies based on a specific movie.
   * @param id - The ID of the movie to get recommendations for.
   * @param options - Additional options for fetching movie recommendations.
   * @returns A promise that resolves to the movie recommendations.
   * @example
   * const recommendations = await tmdb.getMovieRecommendations(550);
   */
  async getMovieRecommendations(
    id: number,
    options?: Types.TMDBLanguageOption & Types.TMDBPageOption
  ): Promise<Types.TMDBRecommendations> {
    return await this.get<Types.TMDBRecommendations>(`/movie/${id}/recommendations`, { params: options });
  }

  /**
   * @brief Get movie release dates
   * @description This method retrieves the release dates for a specific movie in different countries.
   * @param id - The ID of the movie to retrieve release dates for.
   * @returns A promise that resolves to the movie release dates.
   * @example
   * const releaseDates = await tmdb.getMovieReleaseDates(550);
   */
  async getMovieReleaseDates(id: number): Promise<Types.TMDBReleaseDates> {
    return await this.get<Types.TMDBReleaseDates>(`/movie/${id}/release_dates`);
  }

  /**
   * @brief Get movie reviews
   * @description This method retrieves the user reviews for a specific movie.
   * @param id - The ID of the movie to retrieve reviews for.
   * @param options - Additional options for fetching movie reviews.
   * @returns A promise that resolves to the movie reviews.
   * @example
   * const movieReviews = await tmdb.getMovieReviews(550);
   */
  async getMovieReviews(
    id: number,
    options?: Types.TMDBLanguageOption & Types.TMDBPageOption
  ): Promise<Types.TMDBReviews> {
    return await this.get<Types.TMDBReviews>(`/movie/${id}/reviews`, { params: options });
  }

  /**
   * @brief Get similar movies
   * @description This method retrieves a list of movies similar to a specific movie.
   * @param id - The ID of the movie to get similar movies for.
   * @param options - Additional options for fetching similar movies.
   * @returns A promise that resolves to similar movies.
   * @example
   * const similarMovies = await tmdb.getSimilarMovie(550);
   */
  async getSimilarMovie(
    id: number,
    options?: Types.TMDBLanguageOption & Types.TMDBPageOption
  ): Promise<Types.TMDBSimilarMovies> {
    return await this.get<Types.TMDBSimilarMovies>(`/movie/${id}/similar`, { params: options });
  }

  /**
   * @brief Get movie translations
   * @description This method retrieves the translations for a specific movie.
   * @param id - The ID of the movie to retrieve translations for.
   * @returns A promise that resolves to the movie translations.
   * @example
   * const movieTranslations = await tmdb.getMovieTranslations(550);
   */
  async getMovieTranslations(id: number): Promise<Types.TMDBTranslations> {
    return await this.get<Types.TMDBTranslations>(`/movie/${id}/translations`);
  }

  /**
   * @brief Get movie videos
   * @description This method retrieves the videos (trailers, teasers, etc.) for a specific movie.
   * @param id - The ID of the movie to retrieve videos for.
   * @param options - Additional options for fetching movie videos.
   * @returns A promise that resolves to the movie videos.
   * @example
   * const movieVideos = await tmdb.getMovieVideos(550);
   */
  async getMovieVideos(id: number, options?: Types.TMDBLanguageOption): Promise<Types.TMDBVideos> {
    return await this.get<Types.TMDBVideos>(`/movie/${id}/videos`, { params: options });
  }

  /**
   * @brief Get movie watch providers
   * @description This method retrieves the watch providers for a specific movie.
   * @param id - The ID of the movie to retrieve watch providers for.
   * @returns A promise that resolves to the movie watch providers.
   * @example
   * const watchProviders = await tmdb.getMovieWatchProviders(550);
   */
  async getMovieWatchProviders(id: number): Promise<Types.TMDBWatchProviders> {
    return await this.get<Types.TMDBWatchProviders>(`/movie/${id}/watch/providers`);
  }

  /**
   * @brief Get latest movie
   * @description This method retrieves the most recently added movie to TMDB.
   * @returns A promise that resolves to the latest movie details.
   * @example
   * const latestMovie = await tmdb.getLatestMovie();
   */
  async getLatestMovie(): Promise<Types.TMDBLatestMovie> {
    return await this.get<Types.TMDBLatestMovie>('/movie/latest');
  }

  /**
   * @brief Get now playing movies
   * @description This method retrieves a list of movies that are currently playing in theaters.
   * @param options - Additional options for fetching now playing movies.
   * @returns A promise that resolves to now playing movies.
   * @example
   * const nowPlaying = await tmdb.getNowPlayingMovies();
   */
  async getNowPlayingMovies(
    options?: Types.TMDBPageOption & Types.TMDBLanguageOption & Types.TMDBRegionOption
  ): Promise<Types.TMDBMoviesPlayingNow> {
    return await this.get<Types.TMDBMoviesPlayingNow>('/movie/now_playing', { params: options });
  }

  /**
   * @brief Get popular movies
   * @description This method retrieves a list of the current popular movies on TMDB.
   * @param options - Additional options for fetching popular movies.
   * @returns A promise that resolves to popular movies.
   * @example
   * const popularMovies = await tmdb.getPopularMovies();
   */
  async getPopularMovies(options?: Types.TMDBLanguageOption & Types.TMDBPageOption): Promise<Types.TMDBPopularMovies> {
    return await this.get<Types.TMDBPopularMovies>('/movie/popular', { params: options });
  }

  /**
   * @brief Get top rated movies
   * @description This method retrieves a list of the top rated movies on TMDB.
   * @param options - Additional options for fetching top rated movies.
   * @returns A promise that resolves to top rated movies.
   * @example
   * const topRatedMovies = await tmdb.getTopRatedMovies();
   */
  async getTopRatedMovies(
    options?: Types.TMDBPageOption & Types.TMDBLanguageOption & Types.TMDBRegionOption
  ): Promise<Types.TMDBTopRatedMovies> {
    return await this.get<Types.TMDBTopRatedMovies>('/movie/top_rated', { params: options });
  }

  /**
   * @brief Get upcoming movies
   * @description This method retrieves a list of upcoming movies that will be released soon.
   * @param options - Additional options for fetching upcoming movies.
   * @returns A promise that resolves to upcoming movies.
   * @example
   * const upcomingMovies = await tmdb.getUpcomingMovies();
   */
  async getUpcomingMovies(
    options?: Types.TMDBPageOption & Types.TMDBLanguageOption & Types.TMDBRegionOption
  ): Promise<Types.TMDBUpcomingMovies> {
    return await this.get<Types.TMDBUpcomingMovies>('/movie/upcoming', { params: options });
  }

  /**
   * @brief Get TV episode details
   * @description This method retrieves the details of a specific TV episode, with optional append to response.
   * @param episodeSelection - The selection criteria for the episode (TV show ID, season number, episode number).
   * @param appendToResponse - Additional data to append to the response.
   * @param options - Additional options for fetching episode details.
   * @returns A promise that resolves to the episode details.
   * @example
   * const episodeDetails = await tmdb.getTvEpisodeDetails({ tvShowID: 1399, seasonNumber: 1, episodeNumber: 1 });
   */
  async getTvEpisodeDetails<T extends Types.TMDBAppendToResponseTvEpisodeKey[] | undefined>(
    episodeSelection: Types.TMDBEpisodeSelection,
    appendToResponse?: T,
    options?: Types.TMDBLanguageOption
  ) {
    const combinedOptions = {
      append_to_response: appendToResponse ? appendToResponse.join(',') : undefined,
      ...options
    };

    const path = `/tv/${episodeSelection.tvShowID}/season/${episodeSelection.seasonNumber}/episode/${episodeSelection.episodeNumber}`;
    return await this.get<Types.TMDBAppendToResponse<Omit<Types.TMDBEpisode, 'show_id'>, T, 'tvEpisode'>>(path, {
      params: combinedOptions
    });
  }

  /**
   * @brief Get TV episode changes
   * @description This method retrieves the changes for a specific TV episode.
   * @param episodeID - The ID of the episode to retrieve changes for.
   * @param options - Options for fetching episode changes.
   * @returns A promise that resolves to the episode changes.
   * @example
   * const episodeChanges = await tmdb.getTvEpisodeChanges(123456);
   */
  async getTvEpisodeChanges(
    episodeID: number,
    options?: Types.TMDBChangeOption
  ): Promise<Types.TMDBChanges<Types.TMDBTvEpisodeChangeValue>> {
    return await this.get<Types.TMDBChanges<Types.TMDBTvEpisodeChangeValue>>(`/tv/episode/${episodeID}/changes`, {
      params: options
    });
  }

  /**
   * @brief Get TV episode credits
   * @description This method retrieves the cast and crew credits for a specific TV episode.
   * @param episodeSelection - The selection criteria for the episode (TV show ID, season number, episode number).
   * @param options - Additional options for fetching episode credits.
   * @returns A promise that resolves to the episode credits.
   * @example
   * const episodeCredits = await tmdb.getTvEpisodeCredits({ tvShowID: 1399, seasonNumber: 1, episodeNumber: 1 });
   */
  async getTvEpisodeCredits(
    episodeSelection: Types.TMDBEpisodeSelection,
    options?: Types.TMDBLanguageOption
  ): Promise<Types.TMDBTvEpisodeCredit> {
    const path = `/tv/${episodeSelection.tvShowID}/season/${episodeSelection.seasonNumber}/episode/${episodeSelection.episodeNumber}/credits`;
    return await this.get<Types.TMDBTvEpisodeCredit>(path, { params: options });
  }

  /**
   * @brief Get TV episode external IDs
   * @description This method retrieves the external IDs for a specific TV episode.
   * @param episodeSelection - The selection criteria for the episode (TV show ID, season number, episode number).
   * @returns A promise that resolves to the episode's external IDs.
   * @example
   * const externalIds = await tmdb.getTvEpisodeExternalIds({ tvShowID: 1399, seasonNumber: 1, episodeNumber: 1 });
   */
  async getTvEpisodeExternalIds(episodeSelection: Types.TMDBEpisodeSelection): Promise<Types.TMDBExternalIds> {
    const path = `/tv/${episodeSelection.tvShowID}/season/${episodeSelection.seasonNumber}/episode/${episodeSelection.episodeNumber}/external_ids`;
    return await this.get<Types.TMDBExternalIds>(path);
  }

  /**
   * @brief Get TV episode images
   * @description This method retrieves the images for a specific TV episode.
   * @param episodeSelection - The selection criteria for the episode (TV show ID, season number, episode number).
   * @param options - Additional options for fetching episode images.
   * @returns A promise that resolves to the episode images.
   * @example
   * const episodeImages = await tmdb.getTvEpisodeImages({ tvShowID: 1399, seasonNumber: 1, episodeNumber: 1 });
   */
  async getTvEpisodeImages(
    episodeSelection: Types.TMDBEpisodeSelection,
    options?: Types.TMDBTvEpisodeImageSearchOptions
  ): Promise<Types.TMDBImages> {
    const computedOptions = {
      include_image_language: options?.include_image_language?.join(','),
      language: options?.language
    };
    const path = `/tv/${episodeSelection.tvShowID}/season/${episodeSelection.seasonNumber}/episode/${episodeSelection.episodeNumber}/images`;
    return await this.get<Types.TMDBImages>(path, { params: computedOptions });
  }

  /**
   * @brief Get TV episode translations
   * @description This method retrieves the translations for a specific TV episode.
   * @param episodeSelection - The selection criteria for the episode (TV show ID, season number, episode number).
   * @returns A promise that resolves to the episode translations.
   * @example
   * const episodeTranslations = await tmdb.getTvEpisodeTranslations({ tvShowID: 1399, seasonNumber: 1, episodeNumber: 1 });
   */
  async getTvEpisodeTranslations(
    episodeSelection: Types.TMDBEpisodeSelection
  ): Promise<Types.TMDBTvEpisodeTranslations> {
    const path = `/tv/${episodeSelection.tvShowID}/season/${episodeSelection.seasonNumber}/episode/${episodeSelection.episodeNumber}/translations`;
    return await this.get<Types.TMDBTvEpisodeTranslations>(path);
  }

  /**
   * @brief Get TV episode videos
   * @description This method retrieves the videos for a specific TV episode.
   * @param episodeSelection - The selection criteria for the episode (TV show ID, season number, episode number).
   * @param options - Additional options for fetching episode videos.
   * @returns A promise that resolves to the episode videos.
   * @example
   * const episodeVideos = await tmdb.getTvEpisodeVideos({ tvShowID: 1399, seasonNumber: 1, episodeNumber: 1 });
   */
  async getTvEpisodeVideos(
    episodeSelection: Types.TMDBEpisodeSelection,
    options?: Types.TMDBTvEpisodeVideoSearchOptions
  ): Promise<Types.TMDBVideos> {
    const computedOptions = {
      include_video_language: options?.include_video_language?.join(','),
      language: options?.language
    };
    const path = `/tv/${episodeSelection.tvShowID}/season/${episodeSelection.seasonNumber}/episode/${episodeSelection.episodeNumber}/videos`;
    return await this.get<Types.TMDBVideos>(path, { params: computedOptions });
  }

  /**
   * @brief Get TV season details
   * @description This method retrieves the details of a specific TV season, with optional append to response.
   * @param seasonSelection - The selection criteria for the season (TV show ID, season number).
   * @param appendToResponse - Additional data to append to the response.
   * @param options - Additional options for fetching season details.
   * @returns A promise that resolves to the season details.
   * @example
   * const seasonDetails = await tmdb.getTvSeasonDetails({ tvShowID: 1399, seasonNumber: 1 });
   */
  async getTvSeasonDetails<T extends Types.TMDBAppendToResponseTvSeasonKey[] | undefined>(
    seasonSelection: Types.TMDBSeasonSelection,
    appendToResponse?: T,
    options?: Types.TMDBLanguageOption
  ) {
    const combinedOptions = {
      append_to_response: appendToResponse ? appendToResponse.join(',') : undefined,
      ...options
    };

    const path = `/tv/${seasonSelection.tvShowID}/season/${seasonSelection.seasonNumber}`;
    return await this.get<Types.TMDBAppendToResponse<Types.TMDBSeasonDetails, T, 'tvSeason'>>(path, {
      params: combinedOptions
    });
  }

  /**
   * @brief Get TV season aggregate credits
   * @description This method retrieves the aggregate credits for a specific TV season.
   * @param seasonSelection - The selection criteria for the season (TV show ID, season number).
   * @param options - Additional options for fetching season aggregate credits.
   * @returns A promise that resolves to the season aggregate credits.
   * @example
   * const aggregateCredits = await tmdb.getTvSeasonAggregateCredits({ tvShowID: 1399, seasonNumber: 1 });
   */
  async getTvSeasonAggregateCredits(
    seasonSelection: Types.TMDBSeasonSelection,
    options?: Types.TMDBLanguageOption
  ): Promise<Types.TMDBAggregateCredits> {
    const path = `/tv/${seasonSelection.tvShowID}/season/${seasonSelection.seasonNumber}/aggregate_credits`;
    return await this.get<Types.TMDBAggregateCredits>(path, { params: options });
  }

  /**
   * @brief Get TV season changes
   * @description This method retrieves the changes for a specific TV season.
   * @param seasonId - The ID of the season to retrieve changes for.
   * @param options - Options for fetching season changes.
   * @returns A promise that resolves to the season changes.
   * @example
   * const seasonChanges = await tmdb.getTvSeasonChanges(123456);
   */
  async getTvSeasonChanges(
    seasonId: number,
    options?: Types.TMDBChangeOption
  ): Promise<Types.TMDBChanges<Types.TMDBTvSeasonChangeValue>> {
    return await this.get<Types.TMDBChanges<Types.TMDBTvSeasonChangeValue>>(`/tv/season/${seasonId}/changes`, {
      params: options
    });
  }

  /**
   * @brief Get TV season credits
   * @description This method retrieves the cast and crew credits for a specific TV season.
   * @param seasonSelection - The selection criteria for the season (TV show ID, season number).
   * @param options - Additional options for fetching season credits.
   * @returns A promise that resolves to the season credits.
   * @example
   * const seasonCredits = await tmdb.getTvSeasonCredits({ tvShowID: 1399, seasonNumber: 1 });
   */
  async getTvSeasonCredits(
    seasonSelection: Types.TMDBSeasonSelection,
    options?: Types.TMDBLanguageOption
  ): Promise<Types.TMDBCredits> {
    const path = `/tv/${seasonSelection.tvShowID}/season/${seasonSelection.seasonNumber}/credits`;
    return await this.get<Types.TMDBCredits>(path, { params: options });
  }

  /**
   * @brief Get TV season external IDs
   * @description This method retrieves the external IDs for a specific TV season.
   * @param seasonSelection - The selection criteria for the season (TV show ID, season number).
   * @param options - Additional options for fetching season external IDs.
   * @returns A promise that resolves to the season's external IDs.
   * @example
   * const externalIds = await tmdb.getTvSeasonExternalIds({ tvShowID: 1399, seasonNumber: 1 });
   */
  async getTvSeasonExternalIds(
    seasonSelection: Types.TMDBSeasonSelection,
    options?: Types.TMDBLanguageOption
  ): Promise<Types.TMDBExternalIds> {
    const path = `/tv/${seasonSelection.tvShowID}/season/${seasonSelection.seasonNumber}/external_ids`;
    return await this.get<Types.TMDBExternalIds>(path, { params: options });
  }

  /**
   * @brief Get TV season images
   * @description This method retrieves the images for a specific TV season.
   * @param seasonSelection - The selection criteria for the season (TV show ID, season number).
   * @param options - Additional options for fetching season images.
   * @returns A promise that resolves to the season images.
   * @example
   * const seasonImages = await tmdb.getTvSeasonImages({ tvShowID: 1399, seasonNumber: 1 });
   */
  async getTvSeasonImages(
    seasonSelection: Types.TMDBSeasonSelection,
    options?: Types.TMDBTvSeasonImageSearchOptions
  ): Promise<Types.TMDBImages> {
    const computedOptions = {
      include_image_language: options?.include_image_language?.join(','),
      language: options?.language
    };
    const path = `/tv/${seasonSelection.tvShowID}/season/${seasonSelection.seasonNumber}/images`;
    return await this.get<Types.TMDBImages>(path, { params: computedOptions });
  }

  /**
   * @brief Get TV season videos
   * @description This method retrieves the videos for a specific TV season.
   * @param seasonSelection - The selection criteria for the season (TV show ID, season number).
   * @param options - Additional options for fetching season videos.
   * @returns A promise that resolves to the season videos.
   * @example
   * const seasonVideos = await tmdb.getTvSeasonVideos({ tvShowID: 1399, seasonNumber: 1 });
   */
  async getTvSeasonVideos(
    seasonSelection: Types.TMDBSeasonSelection,
    options?: Types.TMDBTvSeasonVideoSearchOptions
  ): Promise<Types.TMDBVideos> {
    const computedOptions = {
      include_video_language: options?.include_video_language?.join(','),
      language: options?.language
    };
    const path = `/tv/${seasonSelection.tvShowID}/season/${seasonSelection.seasonNumber}/videos`;
    return await this.get<Types.TMDBVideos>(path, { params: computedOptions });
  }

  /**
   * @brief Get TV season translations
   * @description This method retrieves the translations for a specific TV season.
   * @param seasonSelection - The selection criteria for the season (TV show ID, season number).
   * @param options - Additional options for fetching season translations.
   * @returns A promise that resolves to the season translations.
   * @example
   * const seasonTranslations = await tmdb.getTvSeasonTranslations({ tvShowID: 1399, seasonNumber: 1 });
   */
  async getTvSeasonTranslations(
    seasonSelection: Types.TMDBSeasonSelection,
    options?: Types.TMDBLanguageOption
  ): Promise<Types.TMDBTranslations> {
    const path = `/tv/${seasonSelection.tvShowID}/season/${seasonSelection.seasonNumber}/translations`;
    return await this.get<Types.TMDBTranslations>(path, { params: options });
  }

  /**
   * @brief Get TV show details
   * @description This method retrieves the details of a specific TV show, with optional append to response.
   * @param id - The ID of the TV show to retrieve details for.
   * @param appendToResponse - Additional data to append to the response.
   * @param language - The language for the response.
   * @returns A promise that resolves to the TV show details.
   * @example
   * const tvShowDetails = await tmdb.getTvShowDetails(1399, ['credits', 'videos']);
   */
  async getTvShowDetails<T extends Types.TMDBAppendToResponseTvKey[] | undefined>(
    id: number,
    appendToResponse?: T,
    language?: string
  ) {
    const options = {
      append_to_response: appendToResponse ? appendToResponse.join(',') : undefined,
      language: language
    };
    return await this.get<Types.TMDBAppendToResponse<Types.TMDBTvShowDetails, T, 'tvShow'>>(`/tv/${id}`, {
      params: options
    });
  }

  /**
   * @brief Get TV show alternative titles
   * @description This method retrieves the alternative titles for a specific TV show.
   * @param id - The ID of the TV show to retrieve alternative titles for.
   * @returns A promise that resolves to the TV show's alternative titles.
   * @example
   * const alternativeTitles = await tmdb.getTvShowAlternativeTitles(1399);
   */
  async getTvShowAlternativeTitles(id: number): Promise<Types.TMDBAlternativeTitles> {
    return await this.get<Types.TMDBAlternativeTitles>(`/tv/${id}/alternative_titles`);
  }

  /**
   * @brief Get TV show changes
   * @description This method retrieves the changes for a specific TV show.
   * @param id - The ID of the TV show to retrieve changes for.
   * @param options - Options for fetching TV show changes.
   * @returns A promise that resolves to the TV show changes.
   * @example
   * const tvShowChanges = await tmdb.getTvShowChanges(1399);
   */
  async getTvShowChanges(
    id: number,
    options?: Types.TMDBChangeOption
  ): Promise<Types.TMDBChanges<Types.TMDBTvShowChangeValue>> {
    return await this.get<Types.TMDBChanges<Types.TMDBTvShowChangeValue>>(`/tv/${id}/changes`, { params: options });
  }

  /**
   * @brief Get TV show content ratings
   * @description This method retrieves the content ratings for a specific TV show.
   * @param id - The ID of the TV show to retrieve content ratings for.
   * @returns A promise that resolves to the TV show's content ratings.
   * @example
   * const contentRatings = await tmdb.getTvShowContentRatings(1399);
   */
  async getTvShowContentRatings(id: number): Promise<Types.TMDBContentRatings> {
    return await this.get<Types.TMDBContentRatings>(`/tv/${id}/content_ratings`);
  }

  /**
   * @brief Get TV show aggregate credits
   * @description This method retrieves the aggregate credits for a specific TV show.
   * @param id - The ID of the TV show to retrieve aggregate credits for.
   * @param options - Additional options for fetching TV show aggregate credits.
   * @returns A promise that resolves to the TV show's aggregate credits.
   * @example
   * const aggregateCredits = await tmdb.getTvShowAggregateCredits(1399);
   */
  async getTvShowAggregateCredits(id: number, options?: Types.TMDBLanguageOption): Promise<Types.TMDBAggregateCredits> {
    return await this.get<Types.TMDBAggregateCredits>(`/tv/${id}/aggregate_credits`, { params: options });
  }

  /**
   * @brief Get TV show credits
   * @description This method retrieves the cast and crew credits for a specific TV show.
   * @param id - The ID of the TV show to retrieve credits for.
   * @param options - Additional options for fetching TV show credits.
   * @returns A promise that resolves to the TV show credits.
   * @example
   * const tvShowCredits = await tmdb.getTvShowCredits(1399);
   */
  async getTvShowCredits(id: number, options?: Types.TMDBLanguageOption): Promise<Types.TMDBCredits> {
    return await this.get<Types.TMDBCredits>(`/tv/${id}/credits`, { params: options });
  }

  /**
   * @brief Get TV show season
   * @description This method retrieves the details of a specific season of a TV show.
   * @param tvId - The ID of the TV show.
   * @param seasonNumber - The season number to retrieve.
   * @returns A promise that resolves to the season details.
   * @example
   * const seasonDetails = await tmdb.getTvShowSeason(1399, 1);
   */
  async getTvShowSeason(tvId: number, seasonNumber: number): Promise<Types.TMDBSeasonDetails> {
    return await this.get<Types.TMDBSeasonDetails>(`/tv/${tvId}/season/${seasonNumber}`);
  }

  /**
   * @brief Get TV show episode groups
   * @description This method retrieves the episode groups for a specific TV show.
   * @param id - The ID of the TV show to retrieve episode groups for.
   * @returns A promise that resolves to the TV show's episode groups.
   * @example
   * const episodeGroups = await tmdb.getTvShowEpisodeGroups(1399);
   */
  async getTvShowEpisodeGroups(id: number): Promise<Types.TMDBEpisodeGroups> {
    return await this.get<Types.TMDBEpisodeGroups>(`/tv/${id}/episode_groups`);
  }

  /**
   * @brief Get TV show external IDs
   * @description This method retrieves the external IDs for a specific TV show.
   * @param id - The ID of the TV show to retrieve external IDs for.
   * @returns A promise that resolves to the TV show's external IDs.
   * @example
   * const externalIds = await tmdb.getTvShowExternalIds(1399);
   */
  async getTvShowExternalIds(id: number): Promise<Types.TMDBExternalIds> {
    return await this.get<Types.TMDBExternalIds>(`/tv/${id}/external_ids`);
  }

  /**
   * @brief Get TV show images
   * @description This method retrieves the images for a specific TV show.
   * @param id - The ID of the TV show to retrieve images for.
   * @param options - Additional options for fetching TV show images.
   * @returns A promise that resolves to the TV show images.
   * @example
   * const tvShowImages = await tmdb.getTvShowImages(1399);
   */
  async getTvShowImages(id: number, options?: Types.TMDBTvShowImageOptions): Promise<Types.TMDBImages> {
    const computedOptions = {
      include_image_language: options?.include_image_language?.join(','),
      language: options?.language
    };
    return await this.get<Types.TMDBImages>(`/tv/${id}/images`, { params: computedOptions });
  }

  /**
   * @brief Get TV show keywords
   * @description This method retrieves the keywords associated with a specific TV show.
   * @param id - The ID of the TV show to retrieve keywords for.
   * @returns A promise that resolves to the TV show keywords.
   * @example
   * const tvShowKeywords = await tmdb.getTvShowKeywords(1399);
   */
  async getTvShowKeywords(id: number): Promise<Types.TMDBKeywords> {
    return await this.get<Types.TMDBKeywords>(`/tv/${id}/keywords`);
  }

  /**
   * @brief Get TV show recommendations
   * @description This method retrieves a list of recommended TV shows based on a specific TV show.
   * @param id - The ID of the TV show to get recommendations for.
   * @param options - Additional options for fetching TV show recommendations.
   * @returns A promise that resolves to the TV show recommendations.
   * @example
   * const recommendations = await tmdb.getTvShowRecommendations(1399);
   */
  async getTvShowRecommendations(
    id: number,
    options?: Types.TMDBLanguageOption & Types.TMDBPageOption
  ): Promise<Types.TMDBRecommendations> {
    return await this.get<Types.TMDBRecommendations>(`/tv/${id}/recommendations`, { params: options });
  }

  /**
   * @brief Get TV show reviews
   * @description This method retrieves the user reviews for a specific TV show.
   * @param id - The ID of the TV show to retrieve reviews for.
   * @param options - Additional options for fetching TV show reviews.
   * @returns A promise that resolves to the TV show reviews.
   * @example
   * const tvShowReviews = await tmdb.getTvShowReviews(1399);
   */
  async getTvShowReviews(
    id: number,
    options?: Types.TMDBLanguageOption & Types.TMDBPageOption
  ): Promise<Types.TMDBReviews> {
    return await this.get<Types.TMDBReviews>(`/tv/${id}/reviews`, { params: options });
  }

  /**
   * @brief Get TV show screened theatrically
   * @description This method retrieves the information about whether a TV show was screened theatrically.
   * @param id - The ID of the TV show to retrieve screened theatrically information for.
   * @returns A promise that resolves to the TV show's screened theatrically information.
   * @example
   * const screenedTheatrically = await tmdb.getTvShowScreenedTheatrically(1399);
   */
  async getTvShowScreenedTheatrically(id: number): Promise<Types.TMDBScreenedTheatrically> {
    return await this.get<Types.TMDBScreenedTheatrically>(`/tv/${id}/screened_theatrically`);
  }

  /**
   * @brief Get similar TV shows
   * @description This method retrieves a list of TV shows similar to a specific TV show.
   * @param id - The ID of the TV show to get similar shows for.
   * @param options - Additional options for fetching similar TV shows.
   * @returns A promise that resolves to similar TV shows.
   * @example
   * const similarTvShows = await tmdb.getTvShowSimilar(1399);
   */
  async getTvShowSimilar(
    id: number,
    options?: Types.TMDBLanguageOption & Types.TMDBPageOption
  ): Promise<Types.TMDBSimilarTvShows> {
    return await this.get<Types.TMDBSimilarTvShows>(`/tv/${id}/similar`, { params: options });
  }

  /**
   * @brief Get TV show translations
   * @description This method retrieves the translations for a specific TV show.
   * @param id - The ID of the TV show to retrieve translations for.
   * @returns A promise that resolves to the TV show translations.
   * @example
   * const tvShowTranslations = await tmdb.getTvShowTranslations(1399);
   */
  async getTvShowTranslations(id: number): Promise<Types.TMDBTranslations> {
    return await this.get<Types.TMDBTranslations>(`/tv/${id}/translations`);
  }

  /**
   * @brief Get TV show videos
   * @description This method retrieves the videos (trailers, teasers, etc.) for a specific TV show.
   * @param id - The ID of the TV show to retrieve videos for.
   * @param options - Additional options for fetching TV show videos.
   * @returns A promise that resolves to the TV show videos.
   * @example
   * const tvShowVideos = await tmdb.getTvShowVideos(1399);
   */
  async getTvShowVideos(id: number, options?: Types.TMDBTvShowVideoOptions): Promise<Types.TMDBVideos> {
    const computedOptions = {
      include_video_language: options?.include_video_language?.join(','),
      language: options?.language
    };
    return await this.get<Types.TMDBVideos>(`/tv/${id}/videos`, { params: computedOptions });
  }

  /**
   * @brief Get TV show watch providers
   * @description This method retrieves the watch providers for a specific TV show.
   * @param id - The ID of the TV show to retrieve watch providers for.
   * @returns A promise that resolves to the TV show watch providers.
   * @example
   * const watchProviders = await tmdb.getTvShowWatchProviders(1399);
   */
  async getTvShowWatchProviders(id: number): Promise<Types.TMDBWatchProviders> {
    return await this.get<Types.TMDBWatchProviders>(`/tv/${id}/watch/providers`);
  }

  /**
   * @brief Get latest TV show
   * @description This method retrieves the most recently added TV show to TMDB.
   * @returns A promise that resolves to the latest TV show details.
   * @example
   * const latestTvShow = await tmdb.getLatestTvShow();
   */
  async getLatestTvShow(): Promise<Types.TMDBLatestTvShows> {
    return await this.get<Types.TMDBLatestTvShows>('/tv/latest');
  }

  /**
   * @brief Get TV shows on the air
   * @description This method retrieves a list of TV shows that are currently on the air.
   * @param options - Additional options for fetching TV shows on the air.
   * @returns A promise that resolves to TV shows on the air.
   * @example
   * const onTheAir = await tmdb.getTvShowsOnTheAir();
   */
  async getTvShowsOnTheAir(
    options?: Types.TMDBPageOption & Types.TMDBLanguageOption & Types.TMDBTimezoneOption
  ): Promise<Types.TMDBOnTheAir> {
    return await this.get<Types.TMDBOnTheAir>('/tv/on_the_air', { params: options });
  }

  /**
   * @brief Get TV shows airing today
   * @description This method retrieves a list of TV shows that are airing today.
   * @param options - Additional options for fetching TV shows airing today.
   * @returns A promise that resolves to TV shows airing today.
   * @example
   * const airingToday = await tmdb.getTvShowsAiringToday();
   */
  async getTvShowsAiringToday(
    options?: Types.TMDBPageOption & Types.TMDBLanguageOption & Types.TMDBTimezoneOption
  ): Promise<Types.TMDBTvShowsAiringToday> {
    return await this.get<Types.TMDBTvShowsAiringToday>('/tv/airing_today', { params: options });
  }

  /**
   * @brief Get popular TV shows
   * @description This method retrieves a list of the current popular TV shows on TMDB.
   * @param options - Additional options for fetching popular TV shows.
   * @returns A promise that resolves to popular TV shows.
   * @example
   * const popularTvShows = await tmdb.getPopularTvShows();
   */
  async getPopularTvShows(
    options?: Types.TMDBPageOption & Types.TMDBLanguageOption
  ): Promise<Types.TMDBPopularTvShows> {
    return await this.get<Types.TMDBPopularTvShows>('/tv/popular', { params: options });
  }

  /**
   * @brief Get top rated TV shows
   * @description This method retrieves a list of the top rated TV shows on TMDB.
   * @param options - Additional options for fetching top rated TV shows.
   * @returns A promise that resolves to top rated TV shows.
   * @example
   * const topRatedTvShows = await tmdb.getTopRatedTvShows();
   */
  async getTopRatedTvShows(
    options?: Types.TMDBPageOption & Types.TMDBLanguageOption
  ): Promise<Types.TMDBTopRatedTvShows> {
    return await this.get<Types.TMDBTopRatedTvShows>('/tv/top_rated', { params: options });
  }
}
