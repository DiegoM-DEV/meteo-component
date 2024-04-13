export function fetchPlaces(cap, setState){
    fetch(`http://api.zippopotam.us/it/${cap}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error");
      }

      return res.json();
    })
    .then((data) => {
      const { places } = data;
      setState({
        places: places,
        loading: true,
        error: false,
      });
    })
    .catch(() => {
      setState({
        places: [],
        loading: true,
        error: true,
      });
    });
}