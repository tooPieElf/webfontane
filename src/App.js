import './App.css';

    async componentDidMount() {
        this.setState({loading: true});
        const res = await axios.get('https://api.github.com/repositories');
        this.setState({
            repos: res.data,
            loading: false
        })
    }

    searchUsers = async (text) => {
        this.setState({loading: true})
        const res = await axios.get(`https://api.github.com/search/repositories?q=${text}`)
        this.setState({
            repos: res.data.items,
            loading: false
        })
    };

    clearUsers = () => this.setState({repos: [],loading: false});

    setRepo = (svn_url) => this.setState({repoName: svn_url  })

  render() {
        const {loading, repos, repoName} = this.state
    return (
        <Router>
        <div className = "App">
          <NavBar title="Webb Fontane"/>
            <div className="container">
                <Switch>
                <Route path = '/' exact  render ={()=>
                    <>
                        <Search searchUsers={this.searchUsers} clearUsers = {this.clearUsers} />
                        <Repositories repos = {repos} loading = {loading} setRepo ={this.setRepo}/>
                    </>

                }/>
                <Route path = '/analysis' component={ ()=> <Analysis repoName = {repoName} />}/>
                </Switch>


            </div>
        </div>
        </Router>
    );
  }
}

export default App;
