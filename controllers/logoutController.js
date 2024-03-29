export const logout = (req, res, next)=>{
    res.clearCookie("jwt");
      res.redirect('/api/login');
}