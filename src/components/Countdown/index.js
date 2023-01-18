import { Grid, Typography } from "@mui/material";
import * as React from "react";
import { useCountdown } from "../../utils/useCountdown";

const Countdown = (props) => {
  const { timestampEnd } = props;
  const [days, hours, minutes, seconds] = useCountdown(timestampEnd);

  if (days + hours + minutes + seconds <= 0) {
    return <h1>Airdrop is live!</h1>;
  } else {
    return (
      <Grid container sx={{ padding: 0, mt: 3 }}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" sx={{ textAlign: "center", color: "white" }}>
            {days}
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: "center", color: "white" }}>
            Days
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" sx={{ textAlign: "center", color: "white" }}>
            {hours}
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: "center", color: "white" }}>
            Hours
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" sx={{ textAlign: "center", color: "white" }}>
            {minutes}
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: "center", color: "white" }}>
            Minutes
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" sx={{ textAlign: "center", color: "white" }}>
            {seconds}
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: "center", color: "white" }}>
            Seconds
          </Typography>
        </Grid>
      </Grid>
    );
  }
};
export default Countdown;
