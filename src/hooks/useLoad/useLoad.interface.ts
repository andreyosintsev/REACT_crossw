export default interface ILoadingState<T> {
    isLoading: boolean,
    hasError: boolean,
    data: T | null
}