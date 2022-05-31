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
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            {days}
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
            Days
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            {hours}
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
            Hours
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            {minutes}
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
            Minutes
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            {seconds}
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
            Seconds
          </Typography>
        </Grid>
      </Grid>
    );
  }
};
export default Countdown;
